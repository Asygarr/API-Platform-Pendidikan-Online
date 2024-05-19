import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Login, Register } from './dto/create-auth.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../connection/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(register: Register) {
    const { name, username, email, password, role } = register;

    const cekEmail = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (cekEmail) {
      throw new HttpException(
        'Email or Username already exists.',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (role !== 'instruktur' && role !== 'siswa') {
      throw new HttpException('Invalid role.', HttpStatus.BAD_REQUEST);
    }

    const salt = await bcrypt.genSalt(15);
    const hashPassword = await bcrypt.hash(password, salt);

    const registerUser = await this.prisma.user.create({
      data: {
        name,
        username,
        email,
        password: hashPassword,
        role,
      },
    });

    const rensponse = {
      message: 'User registered successfully.',
      data: {
        id: registerUser.id,
        name: registerUser.name,
        username: registerUser.username,
        email: registerUser.email,
        role: registerUser.role,
        createdAt: registerUser.cretaedAt,
      },
    };

    return rensponse;
  }

  async login(login: Login) {
    const { email, password } = login;

    const cekUser = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!cekUser) {
      throw new HttpException('Email not found.', HttpStatus.NOT_FOUND);
    }

    const isMatch = await bcrypt.compare(password, cekUser.password);

    if (!isMatch) {
      throw new HttpException('Invalid credentials.', HttpStatus.BAD_REQUEST);
    }

    // const payload = {
    //   id: cekUser.id,
    //   email: cekUser.email,
    //   role: cekUser.role,
    // };

    // const token = await this.jwtService.signAsync(payload);

    // const response = {
    //   token: token,
    // };

    const payloadAccess = {
      id: cekUser.id,
      email: cekUser.email,
      role: cekUser.role,
    };

    const payloadRefresh = {
      id: cekUser.id,
    };

    const accessToken = await this.jwtService.signAsync(payloadAccess, {
      secret: this.configService.get('JWT_ACCESS_SECRET'),
      expiresIn: '1h',
    });

    const refreshToken = await this.jwtService.signAsync(payloadRefresh, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: '7d',
    });

    await this.prisma.user.update({
      where: {
        id: cekUser.id,
      },
      data: {
        refresh_token: refreshToken,
      },
    });

    const response = {
      token: accessToken,
      refreshToken: refreshToken,
    };

    return response;
  }

  async validateTokenUser(token: string) {
    const decode = this.jwtService.verify(token);

    const user = await this.prisma.user.findUnique({
      where: {
        id: decode.id,
      },
    });

    if (!user) {
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async refreshToken(req: any) {
    try {
      const refreshToken = req.cookies['refreshToken'];
      if (!refreshToken) {
        throw new HttpException('Token not found.', HttpStatus.BAD_REQUEST);
      }
      const user = await this.prisma.user.findFirst({
        where: {
          refresh_token: refreshToken,
        },
      });

      if (!user) {
        throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
      }

      const verify = this.jwtService.verify(refreshToken, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      });

      if (!verify) {
        throw new HttpException('Invalid token.', HttpStatus.BAD_REQUEST);
      }

      const payloadAccess = {
        id: user.id,
        email: user.email,
        role: user.role,
      };

      const accessToken = await this.jwtService.signAsync(payloadAccess, {
        secret: this.configService.get('JWT_ACCESS_SECRET'),
        expiresIn: '1h',
      });

      return {
        token: accessToken,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new HttpException(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async logout(req: any) {
    try {
      const refreshToken = req.cookies['refreshToken'];
      if (!refreshToken) {
        throw new HttpException('Token not found.', HttpStatus.BAD_REQUEST);
      }
      const user = await this.prisma.user.findFirst({
        where: {
          refresh_token: refreshToken,
        },
      });

      if (!user) {
        throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
      }

      await this.prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          refresh_token: null,
        },
      });

      return {
        message: 'Logout successfully.',
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new HttpException(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}

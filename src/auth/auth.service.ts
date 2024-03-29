import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Login, Register } from './dto/create-auth.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../connection/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
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

    const payload = {
      id: cekUser.id,
      email: cekUser.email,
      role: cekUser.role,
    };

    const token = await this.jwtService.signAsync(payload);

    const response = {
      token: token,
    };

    return response;
  }
}

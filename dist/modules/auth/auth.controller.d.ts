import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto): Promise<{
        message: string;
        user: {
            email: string;
            name: string;
            phone: string;
            id: string;
            role: import("@prisma/client").$Enums.Role;
            createdAt: Date;
        };
        accessToken: string;
    }>;
    login(dto: LoginDto): Promise<{
        message: string;
        user: {
            id: string;
            email: string;
            name: string;
            phone: string;
            role: import("@prisma/client").$Enums.Role;
            createdAt: Date;
        };
        accessToken: string;
    }>;
    getProfile(userId: string): Promise<{
        email: string;
        name: string;
        phone: string;
        id: string;
        role: import("@prisma/client").$Enums.Role;
        createdAt: Date;
        identifications: {
            type: string;
            id: string;
            createdAt: Date;
            userId: string | null;
            imageUrl: string;
            userRegion: string | null;
            cropType: string | null;
            confidence: number;
            rawAiOutput: import("@prisma/client/runtime/library").JsonValue;
            snakeId: string | null;
            pestId: string | null;
            isCorrect: boolean | null;
        }[];
    }>;
}

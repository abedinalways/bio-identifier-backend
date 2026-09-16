import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto): Promise<{
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
        id: string;
        email: string;
        name: string;
        phone: string;
        role: import("@prisma/client").$Enums.Role;
        createdAt: Date;
        identifications: {
            id: string;
            createdAt: Date;
            imageUrl: string;
            pestId: string | null;
            type: string;
            userId: string | null;
            userRegion: string | null;
            cropType: string | null;
            confidence: number;
            rawAiOutput: import("@prisma/client/runtime/library").JsonValue;
            snakeId: string | null;
            isCorrect: boolean | null;
        }[];
    }>;
}

import { z } from 'zod';

// Esquema de validación para el registro de usuarios
export const registrerUserSchema = z.object({
    username: z.string({
        required_error: 'Username is required' 
    }),
    email: z.string({
        required_error: 'Email is required'
    }).email({
        message: 'Invalid email' 
    }),
    password: z.string({
        required_error: 'Password is required'
    }).min(8,{
        message: 'Password must be at last 8 characters'
    }),
    studentID: z.string({
        required_error: 'StudentID is required'
    }),
    collegeCareer: z.string({
        required_error: 'collegeCareer is required'
    }),
    dateAdmission: z.string({
        required_error: 'dateAdmission is required'
    }),
    // image: Se puede añadir validación para una imagen si es necesario
    // credential: Igualmente para credenciales
});

// Esquema de validación para el inicio de sesión de usuarios
export const loginUserSchema = z.object({
    email: z.string({
        required_error: 'Email is required'
    }).email({
        message: 'Invalid email' 
    }),
    password: z.string({
        required_error: 'Password is required'
    }).min(8,{
        message: 'Password must be at last 8 characters'
    }),
});

// Esquema de validación para la creación de libros
export const CreateBook = z.object({
    title: z.string({
        required_error: 'Title is required'
    }), 
    ISBN: z.string({
        required_error: 'ISBN is required'
    }), 
    edit: z.string({
        required_error: 'Editorial is required'
    }), 
    autor: z.string({
        required_error: 'Autor is required'
    }), 
    sipnosis: z.string({
        required_error: 'Sipnosis is required'
    }).max(400, {
        message: 'Sipnosis must be at most 400 characters'
    }), 
    date: z.string({
        required_error: 'Date is required'
    }), 
    language: z.string({
        required_error: 'Language is required'
    }), 
    tags: z.string({
        required_error: 'Title is required'
    }).optional(), // Etiquetas opcionales
});
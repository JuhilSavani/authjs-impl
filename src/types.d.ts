// TODO: complete the implementation of these types

import { z } from 'zod';
import { SignInSchema } from '@/lib/schemas';
import { SignUpSchema } from '@/lib/schemas';

export type SignInCredentials = z.infer<typeof SignInSchema>

export type SignUpCredentials = z.infer<typeof SignUpSchema>
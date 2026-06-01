import { auth } from '@/lib/auth';
import { toNextJsHandler } from '@/lib/auth-next';

export const { GET, POST } = toNextJsHandler(auth);

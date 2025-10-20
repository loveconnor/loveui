"use client";

import type { BundledLanguage } from "@repo/code-block";
import {
  CodeBlock,
  CodeBlockBody,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockFilename,
  CodeBlockFiles,
  CodeBlockHeader,
  CodeBlockItem,
  type CodeBlockProps,
} from "@repo/code-block";
import {
  TreeExpander,
  TreeIcon,
  TreeLabel,
  TreeNode,
  TreeNodeContent,
  TreeNodeTrigger,
  TreeProvider,
  TreeView,
} from "@repo/tree";
import { FileCode, FileJson, FileText, FileType } from "lucide-react";
import { useState } from "react";

type FileContent = {
  name: string;
  language: string;
  code: string;
};

const fileContents: Record<string, FileContent> = {
  "server.ts": {
    name: "server.ts",
    language: "typescript",
    code: `import express from 'express';
import { taskRouter } from './routes/tasks';
import { userRouter } from './routes/users';
import { errorHandler } from './middleware/errorHandler';
import { logger } from './middleware/logger';
import { config } from './config';

const app = express();

// Middleware
app.use(express.json());
app.use(logger);

// Routes
app.use('/api/tasks', taskRouter);
app.use('/api/users', userRouter);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handling
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(\`Server running on port \${config.port}\`);
});`,
  },
  "tasks.ts": {
    name: "tasks.ts",
    language: "typescript",
    code: `import { Router } from 'express';
import { TaskService } from '../services/taskService';
import { validateTask } from '../middleware/validation';

const router = Router();
const taskService = new TaskService();

router.get('/', async (req, res, next) => {
  try {
    const tasks = await taskService.getAll();
    res.json(tasks);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const task = await taskService.getById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    next(error);
  }
});

router.post('/', validateTask, async (req, res, next) => {
  try {
    const task = await taskService.create(req.body);
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', validateTask, async (req, res, next) => {
  try {
    const task = await taskService.update(req.params.id, req.body);
    res.json(task);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await taskService.delete(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export { router as taskRouter };`,
  },
  "users.ts": {
    name: "users.ts",
    language: "typescript",
    code: `import { Router } from 'express';
import { UserService } from '../services/userService';
import { validateUser } from '../middleware/validation';

const router = Router();
const userService = new UserService();

router.get('/', async (req, res, next) => {
  try {
    const users = await userService.getAll();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const user = await userService.getById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.post('/', validateUser, async (req, res, next) => {
  try {
    const user = await userService.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

export { router as userRouter };`,
  },
  "taskService.ts": {
    name: "taskService.ts",
    language: "typescript",
    code: `import { db } from '../db';
import type { Task, CreateTaskInput, UpdateTaskInput } from '../types';

export class TaskService {
  async getAll(): Promise<Task[]> {
    return db.tasks.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async getById(id: string): Promise<Task | null> {
    return db.tasks.findUnique({
      where: { id },
    });
  }

  async create(data: CreateTaskInput): Promise<Task> {
    return db.tasks.create({
      data: {
        ...data,
        status: 'pending',
        createdAt: new Date(),
      },
    });
  }

  async update(id: string, data: UpdateTaskInput): Promise<Task> {
    return db.tasks.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });
  }

  async delete(id: string): Promise<void> {
    await db.tasks.delete({
      where: { id },
    });
  }
}`,
  },
  "userService.ts": {
    name: "userService.ts",
    language: "typescript",
    code: `import { db } from '../db';
import { hashPassword } from '../utils/crypto';
import type { User, CreateUserInput } from '../types';

export class UserService {
  async getAll(): Promise<User[]> {
    return db.users.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    });
  }

  async getById(id: string): Promise<User | null> {
    return db.users.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    });
  }

  async create(data: CreateUserInput): Promise<User> {
    const hashedPassword = await hashPassword(data.password);
    
    return db.users.create({
      data: {
        ...data,
        password: hashedPassword,
        createdAt: new Date(),
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    });
  }
}`,
  },
  "errorHandler.ts": {
    name: "errorHandler.ts",
    language: "typescript",
    code: `import type { Request, Response, NextFunction } from 'express';

export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public isOperational = true
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error('Unexpected error:', err);
  
  res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
};`,
  },
  "logger.ts": {
    name: "logger.ts",
    language: "typescript",
    code: `import type { Request, Response, NextFunction } from 'express';

export const logger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    const log = {
      method: req.method,
      url: req.url,
      status: res.statusCode,
      duration: \`\${duration}ms\`,
      timestamp: new Date().toISOString(),
    };
    
    console.log(JSON.stringify(log));
  });
  
  next();
};`,
  },
  "validation.ts": {
    name: "validation.ts",
    language: "typescript",
    code: `import type { Request, Response, NextFunction } from 'express';
import { AppError } from './errorHandler';

export const validateTask = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, description } = req.body;

  if (!title || typeof title !== 'string') {
    throw new AppError(400, 'Title is required and must be a string');
  }

  if (title.length < 3 || title.length > 100) {
    throw new AppError(400, 'Title must be between 3 and 100 characters');
  }

  if (description && typeof description !== 'string') {
    throw new AppError(400, 'Description must be a string');
  }

  next();
};

export const validateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password, name } = req.body;

  if (!email || !email.includes('@')) {
    throw new AppError(400, 'Valid email is required');
  }

  if (!password || password.length < 8) {
    throw new AppError(400, 'Password must be at least 8 characters');
  }

  if (!name || typeof name !== 'string') {
    throw new AppError(400, 'Name is required');
  }

  next();
};`,
  },
  "types.ts": {
    name: "types.ts",
    language: "typescript",
    code: `export type TaskStatus = 'pending' | 'in_progress' | 'completed';

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  createdAt: Date;
  updatedAt?: Date;
}

export interface CreateTaskInput {
  title: string;
  description?: string;
}

export interface UpdateTaskInput {
  title?: string;
  description?: string;
  status?: TaskStatus;
}

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
}

export interface CreateUserInput {
  email: string;
  password: string;
  name: string;
}`,
  },
  "config.ts": {
    name: "config.ts",
    language: "typescript",
    code: `export const config = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  database: {
    url: process.env.DATABASE_URL || 'postgresql://localhost:5432/taskdb',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key',
    expiresIn: '7d',
  },
} as const;`,
  },
  "package.json": {
    name: "package.json",
    language: "json",
    code: `{
  "name": "task-api",
  "version": "1.0.0",
  "description": "RESTful API for task management",
  "main": "dist/server.js",
  "scripts": {
    "dev": "tsx watch src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.18.2",
    "prisma": "^5.7.0",
    "@prisma/client": "^5.7.0",
    "bcrypt": "^5.1.1",
    "jsonwebtoken": "^9.0.2",
    "zod": "^3.22.4"
  },
  "devDependencies": {
    "@types/express": "^4.17.21",
    "@types/node": "^20.10.5",
    "@types/bcrypt": "^5.0.2",
    "tsx": "^4.7.0",
    "typescript": "^5.3.3"
  }
}`,
  },
  "README.md": {
    name: "README.md",
    language: "markdown",
    code: `# Task Management API

A RESTful API built with Express and TypeScript for managing tasks and users.

## Features

- 📝 Full CRUD operations for tasks
- 👥 User management
- ✅ Input validation
- 🔒 Error handling
- 📊 Request logging
- 🗄️ PostgreSQL database with Prisma

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL

### Installation

\`\`\`bash
npm install
\`\`\`

### Environment Variables

Create a \`.env\` file:

\`\`\`env
PORT=3000
DATABASE_URL=postgresql://localhost:5432/taskdb
JWT_SECRET=your-secret-key
\`\`\`

### Database Setup

\`\`\`bash
npx prisma migrate dev
\`\`\`

### Run

\`\`\`bash
npm run dev
\`\`\`

## API Endpoints

### Tasks

- \`GET /api/tasks\` - Get all tasks
- \`GET /api/tasks/:id\` - Get task by ID
- \`POST /api/tasks\` - Create task
- \`PUT /api/tasks/:id\` - Update task
- \`DELETE /api/tasks/:id\` - Delete task

### Users

- \`GET /api/users\` - Get all users
- \`GET /api/users/:id\` - Get user by ID
- \`POST /api/users\` - Create user

## Project Structure

\`\`\`
src/
├── routes/          # API routes
├── services/        # Business logic
├── middleware/      # Express middleware
├── types.ts         # TypeScript types
├── config.ts        # Configuration
└── server.ts        # Entry point
\`\`\``,
  },
};

export default function CodebaseExample() {
  const [selectedFile, setSelectedFile] = useState<string>("server.ts");

  // Convert fileContents to the format expected by CodeBlock
  const codeData: CodeBlockProps["data"] = Object.entries(fileContents).map(
    ([id, content]) => ({
      ...content,
      id,
      filename: content.name,
    })
  );

  const handleFileSelect = (fileId: string) => {
    if (fileContents[fileId]) {
      setSelectedFile(fileId);
    }
  };

  return (
    <div className="grid size-full grid-cols-[300px_1fr] divide-x overflow-hidden">
      {/* File Explorer */}
      <div className="size-full overflow-y-auto">
        <TreeProvider
          defaultExpandedIds={["src", "routes", "services", "middleware"]}
          onSelectionChange={(ids) => {
            if (ids.length > 0) {
              handleFileSelect(ids[0]);
            }
          }}
          selectedIds={[selectedFile]}
        >
          <TreeView>
            <TreeNode nodeId="src">
              <TreeNodeTrigger>
                <TreeExpander hasChildren />
                <TreeIcon hasChildren />
                <TreeLabel>src</TreeLabel>
              </TreeNodeTrigger>
              <TreeNodeContent hasChildren>
                <TreeNode level={1} nodeId="routes">
                  <TreeNodeTrigger>
                    <TreeExpander hasChildren />
                    <TreeIcon hasChildren />
                    <TreeLabel>routes</TreeLabel>
                  </TreeNodeTrigger>
                  <TreeNodeContent hasChildren>
                    <TreeNode level={2} nodeId="tasks.ts">
                      <TreeNodeTrigger>
                        <TreeExpander />
                        <TreeIcon icon={<FileType className="h-4 w-4" />} />
                        <TreeLabel>tasks.ts</TreeLabel>
                      </TreeNodeTrigger>
                    </TreeNode>
                    <TreeNode isLast level={2} nodeId="users.ts">
                          <TreeNodeTrigger>
                            <TreeExpander />
                        <TreeIcon icon={<FileType className="h-4 w-4" />} />
                        <TreeLabel>users.ts</TreeLabel>
                          </TreeNodeTrigger>
                    </TreeNode>
                  </TreeNodeContent>
                </TreeNode>
                <TreeNode level={1} nodeId="services">
                  <TreeNodeTrigger>
                    <TreeExpander hasChildren />
                    <TreeIcon hasChildren />
                    <TreeLabel>services</TreeLabel>
                  </TreeNodeTrigger>
                  <TreeNodeContent hasChildren>
                    <TreeNode level={2} nodeId="taskService.ts">
                      <TreeNodeTrigger>
                        <TreeExpander />
                        <TreeIcon icon={<FileType className="h-4 w-4" />} />
                        <TreeLabel>taskService.ts</TreeLabel>
                      </TreeNodeTrigger>
                    </TreeNode>
                    <TreeNode isLast level={2} nodeId="userService.ts">
                      <TreeNodeTrigger>
                        <TreeExpander />
                        <TreeIcon icon={<FileType className="h-4 w-4" />} />
                        <TreeLabel>userService.ts</TreeLabel>
                      </TreeNodeTrigger>
                    </TreeNode>
                  </TreeNodeContent>
                </TreeNode>
                <TreeNode level={1} nodeId="middleware">
                  <TreeNodeTrigger>
                    <TreeExpander hasChildren />
                    <TreeIcon hasChildren />
                    <TreeLabel>middleware</TreeLabel>
                  </TreeNodeTrigger>
                  <TreeNodeContent hasChildren>
                    <TreeNode level={2} nodeId="errorHandler.ts">
                      <TreeNodeTrigger>
                        <TreeExpander />
                        <TreeIcon icon={<FileType className="h-4 w-4" />} />
                        <TreeLabel>errorHandler.ts</TreeLabel>
                      </TreeNodeTrigger>
                    </TreeNode>
                    <TreeNode level={2} nodeId="logger.ts">
                      <TreeNodeTrigger>
                        <TreeExpander />
                        <TreeIcon icon={<FileType className="h-4 w-4" />} />
                        <TreeLabel>logger.ts</TreeLabel>
                      </TreeNodeTrigger>
                    </TreeNode>
                    <TreeNode isLast level={2} nodeId="validation.ts">
                      <TreeNodeTrigger>
                        <TreeExpander />
                        <TreeIcon icon={<FileType className="h-4 w-4" />} />
                        <TreeLabel>validation.ts</TreeLabel>
                      </TreeNodeTrigger>
                    </TreeNode>
                  </TreeNodeContent>
                </TreeNode>
                <TreeNode level={1} nodeId="types.ts">
                  <TreeNodeTrigger>
                    <TreeExpander />
                    <TreeIcon icon={<FileType className="h-4 w-4" />} />
                    <TreeLabel>types.ts</TreeLabel>
                  </TreeNodeTrigger>
                </TreeNode>
                <TreeNode level={1} nodeId="config.ts">
                  <TreeNodeTrigger>
                    <TreeExpander />
                    <TreeIcon icon={<FileType className="h-4 w-4" />} />
                    <TreeLabel>config.ts</TreeLabel>
                  </TreeNodeTrigger>
                </TreeNode>
                <TreeNode isLast level={1} nodeId="server.ts">
                  <TreeNodeTrigger>
                    <TreeExpander />
                    <TreeIcon icon={<FileType className="h-4 w-4" />} />
                    <TreeLabel>server.ts</TreeLabel>
                  </TreeNodeTrigger>
                </TreeNode>
              </TreeNodeContent>
            </TreeNode>
            <TreeNode nodeId="package.json">
              <TreeNodeTrigger>
                <TreeExpander />
                <TreeIcon icon={<FileJson className="h-4 w-4" />} />
                <TreeLabel>package.json</TreeLabel>
              </TreeNodeTrigger>
            </TreeNode>
            <TreeNode isLast nodeId="README.md">
              <TreeNodeTrigger>
                <TreeExpander />
                <TreeIcon icon={<FileText className="h-4 w-4" />} />
                <TreeLabel>README.md</TreeLabel>
              </TreeNodeTrigger>
            </TreeNode>
          </TreeView>
        </TreeProvider>
      </div>

      {/* Code Viewer */}
      <CodeBlock
        className="size-full overflow-y-auto rounded-none border-none"
        data={codeData}
        onValueChange={setSelectedFile}
        value={selectedFile}
      >
        <CodeBlockHeader>
          <CodeBlockFiles>
            {(item) => (
              <CodeBlockFilename key={item.filename} value={item.filename}>
                {item.filename}
              </CodeBlockFilename>
            )}
          </CodeBlockFiles>
          <CodeBlockCopyButton />
        </CodeBlockHeader>
        <CodeBlockBody className="h-[calc(100%-3rem)]">
          {(item) => (
            <CodeBlockItem key={item.filename} value={item.filename}>
              <CodeBlockContent language={item.language as BundledLanguage}>
                {item.code}
              </CodeBlockContent>
            </CodeBlockItem>
          )}
        </CodeBlockBody>
      </CodeBlock>
    </div>
  );
}

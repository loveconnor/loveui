declare module "@modelcontextprotocol/sdk/server" {
  type ServerOptions = {
    name: string;
    version: string;
  };

  type ResourceDescriptor = {
    uri: string;
    name?: string;
    description?: string;
    mimeType?: string;
  };

  type ResourceProvider = {
    name: string;
    listResources: () => Promise<ResourceDescriptor[]>;
    readResource: (uri: string) => Promise<unknown>;
  };

  type ToolHandler = (args: Record<string, unknown>) => Promise<unknown>;

  type Tool = {
    name: string;
    description: string;
    inputSchema: Record<string, unknown>;
    handler: ToolHandler;
  };

  export class Server {
    constructor(options: ServerOptions);
    addResourceProvider(provider: ResourceProvider): void;
    addTool(tool: Tool): void;
    start(): Promise<void>;
  }
}

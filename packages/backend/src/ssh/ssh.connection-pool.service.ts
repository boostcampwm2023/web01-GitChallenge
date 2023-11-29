import { Injectable } from '@nestjs/common';
import { Client } from 'ssh2';
import 'dotenv/config';

class SSHConnection {
  public client: Client;
  private isConnected: boolean;
  private isClosed: boolean;

  constructor(
    private host: string,
    private port: number,
    private username: string,
    private password: string,
  ) {
    this.client = new Client();
    this.isConnected = false;
    this.isClosed = false;
  }

  async connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.client
        .on('ready', () => {
          this.isConnected = true;
          this.isClosed = false;
          resolve();
        })
        .on('close', () => {
          this.isConnected = false;
          this.isClosed = true;
        })
        .on('error', reject)
        .connect({
          host: this.host,
          port: this.port,
          username: this.username,
          password: this.password,
        });
    });
  }

  public isAvailable(): boolean {
    return this.isConnected && !this.isClosed;
  }
}

@Injectable()
export class SSHConnectionPoolService {
  private pool: SSHConnection[] = [];
  private waitingQueue: ((conn: SSHConnection) => void)[] = [];
  private initialized: boolean = false;

  constructor(
    private host: string,
    private port: number,
    private username: string,
    private password: string,
    private maxConnections: number,
  ) {
    this.initializeConnections();
  }

  private async initializeConnections() {
    let successfulConnections = 0;

    while (successfulConnections < this.maxConnections) {
      try {
        const conn = new SSHConnection(
          this.host,
          this.port,
          this.username,
          this.password,
        );
        await conn.connect();
        this.pool.push(conn);
        successfulConnections++;
      } catch (error) {
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    }

    this.initialized = true;
  }

  async getConnection(): Promise<SSHConnection> {
    const availableConn = this.pool.find((conn) => conn.isAvailable());
    if (availableConn) {
      return availableConn;
    }

    return new Promise<SSHConnection>((resolve) => {
      this.waitingQueue.push(resolve);
    });
  }

  returnConnection(conn: SSHConnection) {
    const waiting = this.waitingQueue.shift();
    if (waiting) {
      waiting(conn);
    } else {
      this.pool.push(conn);
    }
  }
}

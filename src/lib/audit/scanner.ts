// Link Scanner Engine - placeholder implementation
import { LinkScannerConfig, ScannedLink } from './types';

export class LinkScanner {
  async scanSite(config: LinkScannerConfig): Promise<ScannedLink[]> {
    // TODO: Implement in task 2.1
    throw new Error('Not implemented yet - will be implemented in task 2.1');
  }

  async scanFile(filePath: string): Promise<ScannedLink[]> {
    // TODO: Implement in task 2.1
    throw new Error('Not implemented yet - will be implemented in task 2.1');
  }

  async scanComponent(componentPath: string): Promise<ScannedLink[]> {
    // TODO: Implement in task 2.1
    throw new Error('Not implemented yet - will be implemented in task 2.1');
  }

  async scanSitemap(): Promise<ScannedLink[]> {
    // TODO: Implement in task 2.2
    throw new Error('Not implemented yet - will be implemented in task 2.2');
  }
}
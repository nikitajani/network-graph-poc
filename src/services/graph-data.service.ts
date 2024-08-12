import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GraphDataService {
  constructor() {}

  generateGraphData(
    N: number,
    numLinks: number
  ): { nodes: any[]; links: any[] } {
    if (N < 1) {
      throw new Error('N must be at least 1');
    }

    const nodes = [];
    const links = new Set<string>(); // Use a Set to avoid duplicate links

    // Generate nodes
    for (let i = 0; i < N; i++) {
      nodes.push({
        id: (i + 1).toString(),
        user: 'user' + (i + 1),
        description: 'Description for node ' + (i + 1),
      });
    }

    // Generate random links
    while (links.size < numLinks) {
      const sourceIndex = Math.floor(Math.random() * N);
      const targetIndex = Math.floor(Math.random() * N);

      // Ensure no self-links and no duplicate links
      if (sourceIndex !== targetIndex) {
        const source = (sourceIndex + 1).toString();
        const target = (targetIndex + 1).toString();
        const link = `${source}-${target}`;

        if (!links.has(link) && !links.has(`${target}-${source}`)) {
          links.add(link);
        }
      }
    }

    // Convert links from Set to array of objects
    const linkArray = Array.from(links).map((link) => {
      const [source, target] = link.split('-');
      return { source, target };
    });

    return {
      nodes: nodes,
      links: linkArray,
    };
  }
}

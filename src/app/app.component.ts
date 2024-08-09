import { Component, OnInit } from '@angular/core';
import ForceGraph from 'force-graph';
import { graphData } from './data';

interface NodeObject {
  id?: string | number;
  user?: string;
  description?: string;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  fx?: number;
  fy?: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  public ngOnInit(): void {
    const myGraph = ForceGraph();
    myGraph(document.getElementById('graph') as HTMLElement)
      .backgroundColor('#101020')
      .nodeRelSize(6)
      .linkColor(() => 'rgba(255,255,255,0.2)')
      .linkDirectionalParticles(1)
      .nodeAutoColorBy('user')
      .nodeLabel((node: NodeObject) => `${node.user}: ${node.description}`)
      .graphData(graphData);
  }
}

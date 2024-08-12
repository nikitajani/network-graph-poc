import { Component, ElementRef, OnInit } from '@angular/core';
import ForceGraph, { GraphData } from 'force-graph';
import { graphData } from './data';
import { GraphDataService } from '../services/graph-data.service';

interface NodeObject {
  id?: string | number;
  ip?: string;
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
  graphData!: GraphData;
  constructor(private graphDataService: GraphDataService) {}

  public ngOnInit(): void {
    this.graphData = this.graphDataService.generateGraphData(5000, 6000);
    const myGraph = ForceGraph();
    myGraph(document.getElementById('graph') as HTMLElement)
      .backgroundColor('#101020')
      .nodeRelSize(6)
      .linkColor(() => 'rgba(255,255,255,0.2)')
      .linkDirectionalParticles(1)
      .nodeAutoColorBy('id')
      .nodeLabel((node: NodeObject) => `${node.id}`)
      .graphData(this.graphData);
  }
}

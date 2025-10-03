// 代码生成时间: 2025-10-04 03:07:27
import { Module } from '@nestjs/common';
import { GraphService } from './graph.service';

@Module({
  providers: [GraphService],
  exports: [GraphService],
})
export class GraphAlgorithmModule {}

/**
 * GraphService class
 * Contains methods to perform various graph operations.
 */
export class GraphService {
  private graph: number[][] = [];

  constructor() {
    this.initializeGraph();
  }

  /**
   * Initializes the graph with a default empty state.
   */
  private initializeGraph(): void {
    this.graph = [];
  }

  /**
   * Adds an edge to the graph.
   * @param from The starting node of the edge.
   * @param to The ending node of the edge.
   * @returns A boolean indicating success or failure.
   */
  public addEdge(from: number, to: number): boolean {
    if (from < 0 || to < 0) {
      throw new Error('Node identifiers must be non-negative.');
    }
    if (!this.graph[from]) {
      this.graph[from] = [];
    }
    this.graph[from].push(to);
    return true;
  }

  /**
   * Performs a Depth-First Search (DFS) on the graph.
   * @param node The starting node for the search.
   * @param visited A set to keep track of visited nodes.
   */
  public dfs(node: number, visited: Set<number>): void {
    if (visited.has(node)) {
      return;
    }
    console.log(`Visited node ${node}`);
    visited.add(node);
    if (this.graph[node]) {
      for (const neighbor of this.graph[node]) {
        this.dfs(neighbor, visited);
      }
    }
  }

  /**
   * Performs a Breadth-First Search (BFS) on the graph.
   * @param node The starting node for the search.
   */
  public bfs(node: number): void {
    const queue: number[] = [node];
    const visited: Set<number> = new Set();
    while (queue.length) {
      const current = queue.shift();
      if (!visited.has(current)) {
        console.log(`Visited node ${current}`);
        visited.add(current);
        if (this.graph[current]) {
          queue.push(...this.graph[current]);
        }
      }
    }
  }

  /**
   * Finds the shortest path between two nodes using Dijkstra's algorithm.
   * @param start The starting node.
   * @param end The ending node.
   * @returns An array of nodes representing the shortest path.
   */
  public dijkstra(start: number, end: number): number[] {
    if (start === end) {
      return [start];
    }
    const distances: number[] = new Array(this.graph.length).fill(Infinity);
    const previous: number[] = new Array(this.graph.length).fill(-1);
    const unvisited: Set<number> = new Set();
    for (let i = 0; i < this.graph.length; i++) {
      unvisited.add(i);
    }
    distances[start] = 0;
    while (unvisited.size > 0) {
      let smallest: number = Infinity;
      let closestNode: number = null;
      for (const node of unvisited) {
        if (distances[node] < smallest) {
          smallest = distances[node];
          closestNode = node;
        }
      }
      unvisited.delete(closestNode);
      if (closestNode === end) {
        break;
      }
      if (this.graph[closestNode]) {
        for (const neighbor of this.graph[closestNode]) {
          if (unvisited.has(neighbor) && distances[closestNode] + 1 < distances[neighbor]) {
            distances[neighbor] = distances[closestNode] + 1;
            previous[neighbor] = closestNode;
          }
        }
      }
    }
    const path: number[] = [];
    for (let at = end; at !== -1; at = previous[at]) {
      path.unshift(at);
    }
    return path;
  }
}

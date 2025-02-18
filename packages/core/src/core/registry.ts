import { Task } from "@/models/Task";
import { TaskSuite, type TaskSuiteFn } from "@/models/TaskSuite";
import { TaskCase, type TaskCaseFn } from "@/models/TaskCase";

export class TaskRegistry {
  private static instance: TaskRegistry;
  private tasks: Task[] = [];
  private currentSuite: TaskSuite | null = null;

  public static getInstance() {
    if (!TaskRegistry.instance) {
      TaskRegistry.instance = new TaskRegistry();
    }
    return TaskRegistry.instance;
  }

  private registerTask(task: Task) {
    if (this.currentSuite) {
      this.currentSuite.subTasks.push(task);
    } else {
      this.tasks.push(task);
    }
  }

  /**
   * Register a suite.
   *
   * @param name - The name of the suite.
   * @param fn - The function that regist
   */
  public registerSuite(name: string, fn: TaskSuiteFn) {
    const task = new TaskSuite(name, this.currentSuite);
    this.registerTask(task);

    const previousSuite = this.currentSuite;
    this.currentSuite = task;

    // Call the suite function recursively, which will register all the tasks
    fn();

    this.currentSuite = previousSuite;
  }

  /**
   * Register a case.
   *
   * @param name - The name of the case.
   * @param fn - The function that registers the case.
   */
  public registerCase(name: string, fn: TaskCaseFn) {
    const task = new TaskCase(name, fn, this.currentSuite);
    this.registerTask(task);
  }

  /**
   * Register a function to be called before all the tasks are run.
   *
   * @param fn - The function to be called before all the tasks are run.
   */
  public registerBeforeAll(fn: TaskSuiteFn) {
    if (this.currentSuite) {
      this.currentSuite.addBeforeAll(fn);
    }
  }

  /**
   * Register a function to be called after all the tasks are run.
   *
   * @param fn - The function to be called after all the tasks are run.
   */
  public registerAfterAll(fn: TaskSuiteFn) {
    if (this.currentSuite) {
      this.currentSuite.addAfterAll(fn);
    }
  }

  /**
   * Register a function to be called before each task is run.
   *
   * @param fn - The function to be called before each task is run.
   */
  public registerBeforeEach(fn: TaskCaseFn) {
    if (this.currentSuite) {
      this.currentSuite.addBeforeEach(fn);
    }
  }

  /**
   * Register a function to be called after each task is run.
   *
   * @param fn - The function to be called after each task is run.
   */
  public registerAfterEach(fn: TaskCaseFn) {
    if (this.currentSuite) {
      this.currentSuite.addAfterEach(fn);
    }
  }

  /**
   * Get all the tasks.
   *
   * @returns All the tasks.
   */
  public getTasks() {
    return this.tasks;
  }
}

export const taskRegistry = TaskRegistry.getInstance();

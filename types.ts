export interface ImageFile {
  file: File;
  preview: string;
}

export enum AppState {
  Initial = 'INITIAL',
  Loading = 'LOADING',
  Result = 'RESULT',
  Error = 'ERROR',
}

export type FocusDirection = 'up' | 'down' | 'left' | 'right';

export type RemoteAction = FocusDirection | 'select' | 'back' | 'home' | 'menu' | 'digit';

export type Rect = {
  left: number;
  right: number;
  top: number;
  bottom: number;
};

export type FocusCandidate = {
  id: string;
  group: string;
  rect: Rect;
};

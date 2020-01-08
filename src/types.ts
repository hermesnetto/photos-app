export interface User {
  id: number;
  name: string;
  email: string;
  media: Media;
}

export interface Media {
  id: number;
  source: string;
  user: User;
}

export interface Post {
  id: number;
  title: string;
  medias: Media[];
  user: User;
}

export enum ROUTES {
  Login = 'Login',
  CreateAccount = 'CreateAccount',
  Feed = 'Feed',
  Profile = 'Profile',
  PostPicture = 'PostPicture',
  SignedIn = 'SignedIn',
  SignedOut = 'SignedOut',
}

export interface Picture {
  height: number;
  uri: string;
  width: number;
}

export enum PICTURE_VIEWS {
  Camera = 'Camera',
  Preview = 'Preview',
}

export interface GqlMutationResult<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface UploadResponse extends GqlMutationResult<{ source: string }> {}

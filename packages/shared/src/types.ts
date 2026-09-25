export interface PublicProfile {
  displayName: string;
  public: boolean;
}

export interface ScanResponse {
  token: string;
  profile: PublicProfile;
}

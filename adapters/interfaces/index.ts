export interface CreateChannel {
  name: string;
  is_private: boolean;
}

export interface AddUserToChanelInterface{
  channel: string;
  users: string[];
}

export interface CreateGroupInterface {
  name: string;
  channels?: string[];
  description?: string;
  handle?: string;
  include_count?: boolean;
  team_id?: string;
}

export interface AddUserToGroupInterface {
  usergroup: string;
  users: string[];
}

export interface sendMessageWithMentionInterface {
  channel: string;
  text: string;
}
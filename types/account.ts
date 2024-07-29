export type UserAccount = {
  id: string;
  name: string;
};

export type UserAccountState = {
  account: UserAccount | null;
};

export type UserAccountActions = {
  setAccount: (account: Omit<UserAccount, 'id'>) => void;
};

export type UserAccountStore = UserAccountState & UserAccountActions;

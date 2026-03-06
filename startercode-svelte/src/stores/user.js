import { writable } from "svelte/store";

const defaultUser = {
  name: "Jonathan",
  streak: 10,
  email: "",
  loggedIn: false
};

function createUserStore() {
  const { subscribe, set, update } = writable(defaultUser);

  return {
    subscribe,
    /** @param {string} email */
    login: (email) => {
      update((user) => ({ ...user, email, loggedIn: true }));
    },
    logout: () => {
      set(defaultUser);
    },
    incrementStreak: () => {
      update((user) => ({ ...user, streak: user.streak + 1 }));
    }
  };
}

export const user = createUserStore();

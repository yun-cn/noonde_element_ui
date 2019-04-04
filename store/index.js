export const state = () => ({
  auth: {
    token:  null,
    id:     null,
    email:  null,
    name:   null,
    kind:   null,
    states: null,
    avatar: null,
  },
});

export const mutations = {
  merge (state, array) {
    let key  = array[0];
    let data = array[1];
    state[key] = { ...state[key], ...data }
  },
};

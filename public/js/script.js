console.log('connected method config')
const config = {
  env: 'production', // dev | sandbox | production
  onEvent: (event) => {
    // Invoked for every event triggerd by the element.
    // Event is a native MessageEvent instance.
  },
  onSuccess: (payload) => {
    // Invoked when an account has successfully been linked.
    // After accounts are linked, `payload.accounts` will contain a list
    // of public account tokens which you will be exchanged for an
    // account through the Method API.
  },
  onError: (error) => {
    // Invoked when an error is raised during.
  },
  onExit: (payload) => {
    // Invoked when a user exits any element flow, or
    // immediately after an error is raised.
  },
  onOpen : (payload) => {
    // Invoked when an element has successfully launched.
  },
};

const method = new Method(config);
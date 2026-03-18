import useCnForClassNameRule from "./rules/use-cn-for-classname.js";

const rules = {
  "use-cn-for-classname": useCnForClassNameRule
} as const;

const configs = {
  recommended: {
    plugins: ["classname-cn"],
    rules: {
      "classname-cn/use-cn-for-classname": "error"
    }
  },
  "flat/recommended": [
    {
      plugins: {
        "classname-cn": {
          rules
        }
      },
      rules: {
        "classname-cn/use-cn-for-classname": "error"
      }
    }
  ]
} as const;

const plugin = {
  rules,
  configs
};

export default plugin;
export { configs, rules };

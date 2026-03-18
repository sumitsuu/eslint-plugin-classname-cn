import useCnForClassNameRule from "./rules/use-cn-for-classname.js";

const rules = {
  "use-cn-for-classname": useCnForClassNameRule
} as const;

const plugin = {
  rules,
  configs: {}
} as {
  rules: typeof rules;
  configs: {
    recommended?: {
      plugins: string[];
      rules: Record<string, "error" | "warn" | "off">;
    };
    "flat/recommended"?: Array<{
      plugins: Record<string, unknown>;
      rules: Record<string, "error" | "warn" | "off">;
    }>;
  };
};

plugin.configs.recommended = {
  plugins: ["classname-cn"],
  rules: {
    "classname-cn/use-cn-for-classname": "error"
  }
};

plugin.configs["flat/recommended"] = [
  {
    plugins: {
      "classname-cn": plugin
    },
    rules: {
      "classname-cn/use-cn-for-classname": "error"
    }
  }
];

export default plugin;
export { rules };

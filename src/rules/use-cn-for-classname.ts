import type { Rule } from "eslint";

type JSXAttributeNode = {
  type: "JSXAttribute";
  name?: {
    type?: string;
    name?: string;
  };
  value?: {
    type?: string;
    expression?: {
      type?: string;
      expressions?: unknown[];
    };
  };
};

const MESSAGES = {
  conditional:
    "Use cn(...) for conditional className values instead of ternary expressions.",
  logical:
    "Use cn(...) for conditional className values instead of logical expressions.",
  template: "Use cn(...) for dynamic className template strings."
} as const;

const useCnForClassNameRule: Rule.RuleModule = {
  meta: {
    type: "suggestion",
    docs: {
      description:
        "Enforce using cn(...) helper for dynamic className expressions in JSX.",
      recommended: false
    },
    schema: [],
    messages: MESSAGES
  },
  create(context) {
    return {
      JSXAttribute(node) {
        const attribute = node as JSXAttributeNode;

        if (attribute.name?.type !== "JSXIdentifier") {
          return;
        }

        if (attribute.name.name !== "className") {
          return;
        }

        if (attribute.value?.type !== "JSXExpressionContainer") {
          return;
        }

        const expression = attribute.value.expression;
        if (!expression?.type) {
          return;
        }

        if (expression.type === "ConditionalExpression") {
          context.report({
            node: expression as never,
            messageId: "conditional"
          });
          return;
        }

        if (expression.type === "LogicalExpression") {
          context.report({
            node: expression as never,
            messageId: "logical"
          });
          return;
        }

        if (
          expression.type === "TemplateLiteral" &&
          Array.isArray(expression.expressions) &&
          expression.expressions.length > 0
        ) {
          context.report({
            node: expression as never,
            messageId: "template"
          });
        }
      }
    };
  }
};

export default useCnForClassNameRule;

import { RuleTester } from "eslint";
import { describe, it } from "vitest";

import useCnForClassNameRule from "../src/rules/use-cn-for-classname.js";

const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
    parserOptions: {
      ecmaFeatures: {
        jsx: true
      }
    }
  }
});

describe("use-cn-for-classname", () => {
  it("reports dynamic className patterns and ignores safe cases", () => {
    ruleTester.run("use-cn-for-classname", useCnForClassNameRule, {
      valid: [
        {
          code: "<div className='flex' />;"
        },
        {
          code: "<div className={cn('base', isActive && 'active')} />;"
        },
        {
          code: "<div className={styles.root} />;"
        },
        {
          code: "<div id={isOpen ? 'a' : 'b'} />;"
        }
      ],
      invalid: [
        {
          code: "<div className={isOpen ? 'block' : 'hidden'} />;",
          errors: [{ messageId: "conditional" }]
        },
        {
          code: "<div className={isOpen && 'block'} />;",
          errors: [{ messageId: "logical" }]
        },
        {
          code: "<div className={`btn ${variant}`} />;",
          errors: [{ messageId: "template" }]
        }
      ]
    });
  });
});

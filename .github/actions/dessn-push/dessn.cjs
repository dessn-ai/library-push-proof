#!/usr/bin/env node
// @dessn-ai/mcp-cli 0.1.5: dessn push, bundled for the Dessn Library push GitHub Action. Built from packages/dessn-mcp-cli (pnpm build:action); do not edit.
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// ../../node_modules/.pnpm/commander@13.1.0/node_modules/commander/lib/error.js
var require_error = __commonJS({
  "../../node_modules/.pnpm/commander@13.1.0/node_modules/commander/lib/error.js"(exports2) {
    "use strict";
    var CommanderError2 = class extends Error {
      /**
       * Constructs the CommanderError class
       * @param {number} exitCode suggested exit code which could be used with process.exit
       * @param {string} code an id string representing the error
       * @param {string} message human-readable description of the error
       */
      constructor(exitCode, code, message) {
        super(message);
        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
        this.code = code;
        this.exitCode = exitCode;
        this.nestedError = void 0;
      }
    };
    var InvalidArgumentError2 = class extends CommanderError2 {
      /**
       * Constructs the InvalidArgumentError class
       * @param {string} [message] explanation of why argument is invalid
       */
      constructor(message) {
        super(1, "commander.invalidArgument", message);
        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
      }
    };
    exports2.CommanderError = CommanderError2;
    exports2.InvalidArgumentError = InvalidArgumentError2;
  }
});

// ../../node_modules/.pnpm/commander@13.1.0/node_modules/commander/lib/argument.js
var require_argument = __commonJS({
  "../../node_modules/.pnpm/commander@13.1.0/node_modules/commander/lib/argument.js"(exports2) {
    "use strict";
    var { InvalidArgumentError: InvalidArgumentError2 } = require_error();
    var Argument2 = class {
      /**
       * Initialize a new command argument with the given name and description.
       * The default is that the argument is required, and you can explicitly
       * indicate this with <> around the name. Put [] around the name for an optional argument.
       *
       * @param {string} name
       * @param {string} [description]
       */
      constructor(name, description) {
        this.description = description || "";
        this.variadic = false;
        this.parseArg = void 0;
        this.defaultValue = void 0;
        this.defaultValueDescription = void 0;
        this.argChoices = void 0;
        switch (name[0]) {
          case "<":
            this.required = true;
            this._name = name.slice(1, -1);
            break;
          case "[":
            this.required = false;
            this._name = name.slice(1, -1);
            break;
          default:
            this.required = true;
            this._name = name;
            break;
        }
        if (this._name.length > 3 && this._name.slice(-3) === "...") {
          this.variadic = true;
          this._name = this._name.slice(0, -3);
        }
      }
      /**
       * Return argument name.
       *
       * @return {string}
       */
      name() {
        return this._name;
      }
      /**
       * @package
       */
      _concatValue(value, previous) {
        if (previous === this.defaultValue || !Array.isArray(previous)) {
          return [value];
        }
        return previous.concat(value);
      }
      /**
       * Set the default value, and optionally supply the description to be displayed in the help.
       *
       * @param {*} value
       * @param {string} [description]
       * @return {Argument}
       */
      default(value, description) {
        this.defaultValue = value;
        this.defaultValueDescription = description;
        return this;
      }
      /**
       * Set the custom handler for processing CLI command arguments into argument values.
       *
       * @param {Function} [fn]
       * @return {Argument}
       */
      argParser(fn) {
        this.parseArg = fn;
        return this;
      }
      /**
       * Only allow argument value to be one of choices.
       *
       * @param {string[]} values
       * @return {Argument}
       */
      choices(values) {
        this.argChoices = values.slice();
        this.parseArg = (arg, previous) => {
          if (!this.argChoices.includes(arg)) {
            throw new InvalidArgumentError2(
              `Allowed choices are ${this.argChoices.join(", ")}.`
            );
          }
          if (this.variadic) {
            return this._concatValue(arg, previous);
          }
          return arg;
        };
        return this;
      }
      /**
       * Make argument required.
       *
       * @returns {Argument}
       */
      argRequired() {
        this.required = true;
        return this;
      }
      /**
       * Make argument optional.
       *
       * @returns {Argument}
       */
      argOptional() {
        this.required = false;
        return this;
      }
    };
    function humanReadableArgName(arg) {
      const nameOutput = arg.name() + (arg.variadic === true ? "..." : "");
      return arg.required ? "<" + nameOutput + ">" : "[" + nameOutput + "]";
    }
    exports2.Argument = Argument2;
    exports2.humanReadableArgName = humanReadableArgName;
  }
});

// ../../node_modules/.pnpm/commander@13.1.0/node_modules/commander/lib/help.js
var require_help = __commonJS({
  "../../node_modules/.pnpm/commander@13.1.0/node_modules/commander/lib/help.js"(exports2) {
    "use strict";
    var { humanReadableArgName } = require_argument();
    var Help2 = class {
      constructor() {
        this.helpWidth = void 0;
        this.minWidthToWrap = 40;
        this.sortSubcommands = false;
        this.sortOptions = false;
        this.showGlobalOptions = false;
      }
      /**
       * prepareContext is called by Commander after applying overrides from `Command.configureHelp()`
       * and just before calling `formatHelp()`.
       *
       * Commander just uses the helpWidth and the rest is provided for optional use by more complex subclasses.
       *
       * @param {{ error?: boolean, helpWidth?: number, outputHasColors?: boolean }} contextOptions
       */
      prepareContext(contextOptions) {
        this.helpWidth = this.helpWidth ?? contextOptions.helpWidth ?? 80;
      }
      /**
       * Get an array of the visible subcommands. Includes a placeholder for the implicit help command, if there is one.
       *
       * @param {Command} cmd
       * @returns {Command[]}
       */
      visibleCommands(cmd) {
        const visibleCommands = cmd.commands.filter((cmd2) => !cmd2._hidden);
        const helpCommand = cmd._getHelpCommand();
        if (helpCommand && !helpCommand._hidden) {
          visibleCommands.push(helpCommand);
        }
        if (this.sortSubcommands) {
          visibleCommands.sort((a, b) => {
            return a.name().localeCompare(b.name());
          });
        }
        return visibleCommands;
      }
      /**
       * Compare options for sort.
       *
       * @param {Option} a
       * @param {Option} b
       * @returns {number}
       */
      compareOptions(a, b) {
        const getSortKey = (option) => {
          return option.short ? option.short.replace(/^-/, "") : option.long.replace(/^--/, "");
        };
        return getSortKey(a).localeCompare(getSortKey(b));
      }
      /**
       * Get an array of the visible options. Includes a placeholder for the implicit help option, if there is one.
       *
       * @param {Command} cmd
       * @returns {Option[]}
       */
      visibleOptions(cmd) {
        const visibleOptions = cmd.options.filter((option) => !option.hidden);
        const helpOption = cmd._getHelpOption();
        if (helpOption && !helpOption.hidden) {
          const removeShort = helpOption.short && cmd._findOption(helpOption.short);
          const removeLong = helpOption.long && cmd._findOption(helpOption.long);
          if (!removeShort && !removeLong) {
            visibleOptions.push(helpOption);
          } else if (helpOption.long && !removeLong) {
            visibleOptions.push(
              cmd.createOption(helpOption.long, helpOption.description)
            );
          } else if (helpOption.short && !removeShort) {
            visibleOptions.push(
              cmd.createOption(helpOption.short, helpOption.description)
            );
          }
        }
        if (this.sortOptions) {
          visibleOptions.sort(this.compareOptions);
        }
        return visibleOptions;
      }
      /**
       * Get an array of the visible global options. (Not including help.)
       *
       * @param {Command} cmd
       * @returns {Option[]}
       */
      visibleGlobalOptions(cmd) {
        if (!this.showGlobalOptions) return [];
        const globalOptions = [];
        for (let ancestorCmd = cmd.parent; ancestorCmd; ancestorCmd = ancestorCmd.parent) {
          const visibleOptions = ancestorCmd.options.filter(
            (option) => !option.hidden
          );
          globalOptions.push(...visibleOptions);
        }
        if (this.sortOptions) {
          globalOptions.sort(this.compareOptions);
        }
        return globalOptions;
      }
      /**
       * Get an array of the arguments if any have a description.
       *
       * @param {Command} cmd
       * @returns {Argument[]}
       */
      visibleArguments(cmd) {
        if (cmd._argsDescription) {
          cmd.registeredArguments.forEach((argument) => {
            argument.description = argument.description || cmd._argsDescription[argument.name()] || "";
          });
        }
        if (cmd.registeredArguments.find((argument) => argument.description)) {
          return cmd.registeredArguments;
        }
        return [];
      }
      /**
       * Get the command term to show in the list of subcommands.
       *
       * @param {Command} cmd
       * @returns {string}
       */
      subcommandTerm(cmd) {
        const args = cmd.registeredArguments.map((arg) => humanReadableArgName(arg)).join(" ");
        return cmd._name + (cmd._aliases[0] ? "|" + cmd._aliases[0] : "") + (cmd.options.length ? " [options]" : "") + // simplistic check for non-help option
        (args ? " " + args : "");
      }
      /**
       * Get the option term to show in the list of options.
       *
       * @param {Option} option
       * @returns {string}
       */
      optionTerm(option) {
        return option.flags;
      }
      /**
       * Get the argument term to show in the list of arguments.
       *
       * @param {Argument} argument
       * @returns {string}
       */
      argumentTerm(argument) {
        return argument.name();
      }
      /**
       * Get the longest command term length.
       *
       * @param {Command} cmd
       * @param {Help} helper
       * @returns {number}
       */
      longestSubcommandTermLength(cmd, helper) {
        return helper.visibleCommands(cmd).reduce((max, command) => {
          return Math.max(
            max,
            this.displayWidth(
              helper.styleSubcommandTerm(helper.subcommandTerm(command))
            )
          );
        }, 0);
      }
      /**
       * Get the longest option term length.
       *
       * @param {Command} cmd
       * @param {Help} helper
       * @returns {number}
       */
      longestOptionTermLength(cmd, helper) {
        return helper.visibleOptions(cmd).reduce((max, option) => {
          return Math.max(
            max,
            this.displayWidth(helper.styleOptionTerm(helper.optionTerm(option)))
          );
        }, 0);
      }
      /**
       * Get the longest global option term length.
       *
       * @param {Command} cmd
       * @param {Help} helper
       * @returns {number}
       */
      longestGlobalOptionTermLength(cmd, helper) {
        return helper.visibleGlobalOptions(cmd).reduce((max, option) => {
          return Math.max(
            max,
            this.displayWidth(helper.styleOptionTerm(helper.optionTerm(option)))
          );
        }, 0);
      }
      /**
       * Get the longest argument term length.
       *
       * @param {Command} cmd
       * @param {Help} helper
       * @returns {number}
       */
      longestArgumentTermLength(cmd, helper) {
        return helper.visibleArguments(cmd).reduce((max, argument) => {
          return Math.max(
            max,
            this.displayWidth(
              helper.styleArgumentTerm(helper.argumentTerm(argument))
            )
          );
        }, 0);
      }
      /**
       * Get the command usage to be displayed at the top of the built-in help.
       *
       * @param {Command} cmd
       * @returns {string}
       */
      commandUsage(cmd) {
        let cmdName = cmd._name;
        if (cmd._aliases[0]) {
          cmdName = cmdName + "|" + cmd._aliases[0];
        }
        let ancestorCmdNames = "";
        for (let ancestorCmd = cmd.parent; ancestorCmd; ancestorCmd = ancestorCmd.parent) {
          ancestorCmdNames = ancestorCmd.name() + " " + ancestorCmdNames;
        }
        return ancestorCmdNames + cmdName + " " + cmd.usage();
      }
      /**
       * Get the description for the command.
       *
       * @param {Command} cmd
       * @returns {string}
       */
      commandDescription(cmd) {
        return cmd.description();
      }
      /**
       * Get the subcommand summary to show in the list of subcommands.
       * (Fallback to description for backwards compatibility.)
       *
       * @param {Command} cmd
       * @returns {string}
       */
      subcommandDescription(cmd) {
        return cmd.summary() || cmd.description();
      }
      /**
       * Get the option description to show in the list of options.
       *
       * @param {Option} option
       * @return {string}
       */
      optionDescription(option) {
        const extraInfo = [];
        if (option.argChoices) {
          extraInfo.push(
            // use stringify to match the display of the default value
            `choices: ${option.argChoices.map((choice) => JSON.stringify(choice)).join(", ")}`
          );
        }
        if (option.defaultValue !== void 0) {
          const showDefault = option.required || option.optional || option.isBoolean() && typeof option.defaultValue === "boolean";
          if (showDefault) {
            extraInfo.push(
              `default: ${option.defaultValueDescription || JSON.stringify(option.defaultValue)}`
            );
          }
        }
        if (option.presetArg !== void 0 && option.optional) {
          extraInfo.push(`preset: ${JSON.stringify(option.presetArg)}`);
        }
        if (option.envVar !== void 0) {
          extraInfo.push(`env: ${option.envVar}`);
        }
        if (extraInfo.length > 0) {
          return `${option.description} (${extraInfo.join(", ")})`;
        }
        return option.description;
      }
      /**
       * Get the argument description to show in the list of arguments.
       *
       * @param {Argument} argument
       * @return {string}
       */
      argumentDescription(argument) {
        const extraInfo = [];
        if (argument.argChoices) {
          extraInfo.push(
            // use stringify to match the display of the default value
            `choices: ${argument.argChoices.map((choice) => JSON.stringify(choice)).join(", ")}`
          );
        }
        if (argument.defaultValue !== void 0) {
          extraInfo.push(
            `default: ${argument.defaultValueDescription || JSON.stringify(argument.defaultValue)}`
          );
        }
        if (extraInfo.length > 0) {
          const extraDescription = `(${extraInfo.join(", ")})`;
          if (argument.description) {
            return `${argument.description} ${extraDescription}`;
          }
          return extraDescription;
        }
        return argument.description;
      }
      /**
       * Generate the built-in help text.
       *
       * @param {Command} cmd
       * @param {Help} helper
       * @returns {string}
       */
      formatHelp(cmd, helper) {
        const termWidth = helper.padWidth(cmd, helper);
        const helpWidth = helper.helpWidth ?? 80;
        function callFormatItem(term, description) {
          return helper.formatItem(term, termWidth, description, helper);
        }
        let output = [
          `${helper.styleTitle("Usage:")} ${helper.styleUsage(helper.commandUsage(cmd))}`,
          ""
        ];
        const commandDescription = helper.commandDescription(cmd);
        if (commandDescription.length > 0) {
          output = output.concat([
            helper.boxWrap(
              helper.styleCommandDescription(commandDescription),
              helpWidth
            ),
            ""
          ]);
        }
        const argumentList = helper.visibleArguments(cmd).map((argument) => {
          return callFormatItem(
            helper.styleArgumentTerm(helper.argumentTerm(argument)),
            helper.styleArgumentDescription(helper.argumentDescription(argument))
          );
        });
        if (argumentList.length > 0) {
          output = output.concat([
            helper.styleTitle("Arguments:"),
            ...argumentList,
            ""
          ]);
        }
        const optionList = helper.visibleOptions(cmd).map((option) => {
          return callFormatItem(
            helper.styleOptionTerm(helper.optionTerm(option)),
            helper.styleOptionDescription(helper.optionDescription(option))
          );
        });
        if (optionList.length > 0) {
          output = output.concat([
            helper.styleTitle("Options:"),
            ...optionList,
            ""
          ]);
        }
        if (helper.showGlobalOptions) {
          const globalOptionList = helper.visibleGlobalOptions(cmd).map((option) => {
            return callFormatItem(
              helper.styleOptionTerm(helper.optionTerm(option)),
              helper.styleOptionDescription(helper.optionDescription(option))
            );
          });
          if (globalOptionList.length > 0) {
            output = output.concat([
              helper.styleTitle("Global Options:"),
              ...globalOptionList,
              ""
            ]);
          }
        }
        const commandList = helper.visibleCommands(cmd).map((cmd2) => {
          return callFormatItem(
            helper.styleSubcommandTerm(helper.subcommandTerm(cmd2)),
            helper.styleSubcommandDescription(helper.subcommandDescription(cmd2))
          );
        });
        if (commandList.length > 0) {
          output = output.concat([
            helper.styleTitle("Commands:"),
            ...commandList,
            ""
          ]);
        }
        return output.join("\n");
      }
      /**
       * Return display width of string, ignoring ANSI escape sequences. Used in padding and wrapping calculations.
       *
       * @param {string} str
       * @returns {number}
       */
      displayWidth(str) {
        return stripColor(str).length;
      }
      /**
       * Style the title for displaying in the help. Called with 'Usage:', 'Options:', etc.
       *
       * @param {string} str
       * @returns {string}
       */
      styleTitle(str) {
        return str;
      }
      styleUsage(str) {
        return str.split(" ").map((word) => {
          if (word === "[options]") return this.styleOptionText(word);
          if (word === "[command]") return this.styleSubcommandText(word);
          if (word[0] === "[" || word[0] === "<")
            return this.styleArgumentText(word);
          return this.styleCommandText(word);
        }).join(" ");
      }
      styleCommandDescription(str) {
        return this.styleDescriptionText(str);
      }
      styleOptionDescription(str) {
        return this.styleDescriptionText(str);
      }
      styleSubcommandDescription(str) {
        return this.styleDescriptionText(str);
      }
      styleArgumentDescription(str) {
        return this.styleDescriptionText(str);
      }
      styleDescriptionText(str) {
        return str;
      }
      styleOptionTerm(str) {
        return this.styleOptionText(str);
      }
      styleSubcommandTerm(str) {
        return str.split(" ").map((word) => {
          if (word === "[options]") return this.styleOptionText(word);
          if (word[0] === "[" || word[0] === "<")
            return this.styleArgumentText(word);
          return this.styleSubcommandText(word);
        }).join(" ");
      }
      styleArgumentTerm(str) {
        return this.styleArgumentText(str);
      }
      styleOptionText(str) {
        return str;
      }
      styleArgumentText(str) {
        return str;
      }
      styleSubcommandText(str) {
        return str;
      }
      styleCommandText(str) {
        return str;
      }
      /**
       * Calculate the pad width from the maximum term length.
       *
       * @param {Command} cmd
       * @param {Help} helper
       * @returns {number}
       */
      padWidth(cmd, helper) {
        return Math.max(
          helper.longestOptionTermLength(cmd, helper),
          helper.longestGlobalOptionTermLength(cmd, helper),
          helper.longestSubcommandTermLength(cmd, helper),
          helper.longestArgumentTermLength(cmd, helper)
        );
      }
      /**
       * Detect manually wrapped and indented strings by checking for line break followed by whitespace.
       *
       * @param {string} str
       * @returns {boolean}
       */
      preformatted(str) {
        return /\n[^\S\r\n]/.test(str);
      }
      /**
       * Format the "item", which consists of a term and description. Pad the term and wrap the description, indenting the following lines.
       *
       * So "TTT", 5, "DDD DDDD DD DDD" might be formatted for this.helpWidth=17 like so:
       *   TTT  DDD DDDD
       *        DD DDD
       *
       * @param {string} term
       * @param {number} termWidth
       * @param {string} description
       * @param {Help} helper
       * @returns {string}
       */
      formatItem(term, termWidth, description, helper) {
        const itemIndent = 2;
        const itemIndentStr = " ".repeat(itemIndent);
        if (!description) return itemIndentStr + term;
        const paddedTerm = term.padEnd(
          termWidth + term.length - helper.displayWidth(term)
        );
        const spacerWidth = 2;
        const helpWidth = this.helpWidth ?? 80;
        const remainingWidth = helpWidth - termWidth - spacerWidth - itemIndent;
        let formattedDescription;
        if (remainingWidth < this.minWidthToWrap || helper.preformatted(description)) {
          formattedDescription = description;
        } else {
          const wrappedDescription = helper.boxWrap(description, remainingWidth);
          formattedDescription = wrappedDescription.replace(
            /\n/g,
            "\n" + " ".repeat(termWidth + spacerWidth)
          );
        }
        return itemIndentStr + paddedTerm + " ".repeat(spacerWidth) + formattedDescription.replace(/\n/g, `
${itemIndentStr}`);
      }
      /**
       * Wrap a string at whitespace, preserving existing line breaks.
       * Wrapping is skipped if the width is less than `minWidthToWrap`.
       *
       * @param {string} str
       * @param {number} width
       * @returns {string}
       */
      boxWrap(str, width) {
        if (width < this.minWidthToWrap) return str;
        const rawLines = str.split(/\r\n|\n/);
        const chunkPattern = /[\s]*[^\s]+/g;
        const wrappedLines = [];
        rawLines.forEach((line) => {
          const chunks = line.match(chunkPattern);
          if (chunks === null) {
            wrappedLines.push("");
            return;
          }
          let sumChunks = [chunks.shift()];
          let sumWidth = this.displayWidth(sumChunks[0]);
          chunks.forEach((chunk) => {
            const visibleWidth = this.displayWidth(chunk);
            if (sumWidth + visibleWidth <= width) {
              sumChunks.push(chunk);
              sumWidth += visibleWidth;
              return;
            }
            wrappedLines.push(sumChunks.join(""));
            const nextChunk = chunk.trimStart();
            sumChunks = [nextChunk];
            sumWidth = this.displayWidth(nextChunk);
          });
          wrappedLines.push(sumChunks.join(""));
        });
        return wrappedLines.join("\n");
      }
    };
    function stripColor(str) {
      const sgrPattern = /\x1b\[\d*(;\d*)*m/g;
      return str.replace(sgrPattern, "");
    }
    exports2.Help = Help2;
    exports2.stripColor = stripColor;
  }
});

// ../../node_modules/.pnpm/commander@13.1.0/node_modules/commander/lib/option.js
var require_option = __commonJS({
  "../../node_modules/.pnpm/commander@13.1.0/node_modules/commander/lib/option.js"(exports2) {
    "use strict";
    var { InvalidArgumentError: InvalidArgumentError2 } = require_error();
    var Option2 = class {
      /**
       * Initialize a new `Option` with the given `flags` and `description`.
       *
       * @param {string} flags
       * @param {string} [description]
       */
      constructor(flags, description) {
        this.flags = flags;
        this.description = description || "";
        this.required = flags.includes("<");
        this.optional = flags.includes("[");
        this.variadic = /\w\.\.\.[>\]]$/.test(flags);
        this.mandatory = false;
        const optionFlags = splitOptionFlags(flags);
        this.short = optionFlags.shortFlag;
        this.long = optionFlags.longFlag;
        this.negate = false;
        if (this.long) {
          this.negate = this.long.startsWith("--no-");
        }
        this.defaultValue = void 0;
        this.defaultValueDescription = void 0;
        this.presetArg = void 0;
        this.envVar = void 0;
        this.parseArg = void 0;
        this.hidden = false;
        this.argChoices = void 0;
        this.conflictsWith = [];
        this.implied = void 0;
      }
      /**
       * Set the default value, and optionally supply the description to be displayed in the help.
       *
       * @param {*} value
       * @param {string} [description]
       * @return {Option}
       */
      default(value, description) {
        this.defaultValue = value;
        this.defaultValueDescription = description;
        return this;
      }
      /**
       * Preset to use when option used without option-argument, especially optional but also boolean and negated.
       * The custom processing (parseArg) is called.
       *
       * @example
       * new Option('--color').default('GREYSCALE').preset('RGB');
       * new Option('--donate [amount]').preset('20').argParser(parseFloat);
       *
       * @param {*} arg
       * @return {Option}
       */
      preset(arg) {
        this.presetArg = arg;
        return this;
      }
      /**
       * Add option name(s) that conflict with this option.
       * An error will be displayed if conflicting options are found during parsing.
       *
       * @example
       * new Option('--rgb').conflicts('cmyk');
       * new Option('--js').conflicts(['ts', 'jsx']);
       *
       * @param {(string | string[])} names
       * @return {Option}
       */
      conflicts(names) {
        this.conflictsWith = this.conflictsWith.concat(names);
        return this;
      }
      /**
       * Specify implied option values for when this option is set and the implied options are not.
       *
       * The custom processing (parseArg) is not called on the implied values.
       *
       * @example
       * program
       *   .addOption(new Option('--log', 'write logging information to file'))
       *   .addOption(new Option('--trace', 'log extra details').implies({ log: 'trace.txt' }));
       *
       * @param {object} impliedOptionValues
       * @return {Option}
       */
      implies(impliedOptionValues) {
        let newImplied = impliedOptionValues;
        if (typeof impliedOptionValues === "string") {
          newImplied = { [impliedOptionValues]: true };
        }
        this.implied = Object.assign(this.implied || {}, newImplied);
        return this;
      }
      /**
       * Set environment variable to check for option value.
       *
       * An environment variable is only used if when processed the current option value is
       * undefined, or the source of the current value is 'default' or 'config' or 'env'.
       *
       * @param {string} name
       * @return {Option}
       */
      env(name) {
        this.envVar = name;
        return this;
      }
      /**
       * Set the custom handler for processing CLI option arguments into option values.
       *
       * @param {Function} [fn]
       * @return {Option}
       */
      argParser(fn) {
        this.parseArg = fn;
        return this;
      }
      /**
       * Whether the option is mandatory and must have a value after parsing.
       *
       * @param {boolean} [mandatory=true]
       * @return {Option}
       */
      makeOptionMandatory(mandatory = true) {
        this.mandatory = !!mandatory;
        return this;
      }
      /**
       * Hide option in help.
       *
       * @param {boolean} [hide=true]
       * @return {Option}
       */
      hideHelp(hide = true) {
        this.hidden = !!hide;
        return this;
      }
      /**
       * @package
       */
      _concatValue(value, previous) {
        if (previous === this.defaultValue || !Array.isArray(previous)) {
          return [value];
        }
        return previous.concat(value);
      }
      /**
       * Only allow option value to be one of choices.
       *
       * @param {string[]} values
       * @return {Option}
       */
      choices(values) {
        this.argChoices = values.slice();
        this.parseArg = (arg, previous) => {
          if (!this.argChoices.includes(arg)) {
            throw new InvalidArgumentError2(
              `Allowed choices are ${this.argChoices.join(", ")}.`
            );
          }
          if (this.variadic) {
            return this._concatValue(arg, previous);
          }
          return arg;
        };
        return this;
      }
      /**
       * Return option name.
       *
       * @return {string}
       */
      name() {
        if (this.long) {
          return this.long.replace(/^--/, "");
        }
        return this.short.replace(/^-/, "");
      }
      /**
       * Return option name, in a camelcase format that can be used
       * as an object attribute key.
       *
       * @return {string}
       */
      attributeName() {
        if (this.negate) {
          return camelcase(this.name().replace(/^no-/, ""));
        }
        return camelcase(this.name());
      }
      /**
       * Check if `arg` matches the short or long flag.
       *
       * @param {string} arg
       * @return {boolean}
       * @package
       */
      is(arg) {
        return this.short === arg || this.long === arg;
      }
      /**
       * Return whether a boolean option.
       *
       * Options are one of boolean, negated, required argument, or optional argument.
       *
       * @return {boolean}
       * @package
       */
      isBoolean() {
        return !this.required && !this.optional && !this.negate;
      }
    };
    var DualOptions = class {
      /**
       * @param {Option[]} options
       */
      constructor(options) {
        this.positiveOptions = /* @__PURE__ */ new Map();
        this.negativeOptions = /* @__PURE__ */ new Map();
        this.dualOptions = /* @__PURE__ */ new Set();
        options.forEach((option) => {
          if (option.negate) {
            this.negativeOptions.set(option.attributeName(), option);
          } else {
            this.positiveOptions.set(option.attributeName(), option);
          }
        });
        this.negativeOptions.forEach((value, key) => {
          if (this.positiveOptions.has(key)) {
            this.dualOptions.add(key);
          }
        });
      }
      /**
       * Did the value come from the option, and not from possible matching dual option?
       *
       * @param {*} value
       * @param {Option} option
       * @returns {boolean}
       */
      valueFromOption(value, option) {
        const optionKey = option.attributeName();
        if (!this.dualOptions.has(optionKey)) return true;
        const preset = this.negativeOptions.get(optionKey).presetArg;
        const negativeValue = preset !== void 0 ? preset : false;
        return option.negate === (negativeValue === value);
      }
    };
    function camelcase(str) {
      return str.split("-").reduce((str2, word) => {
        return str2 + word[0].toUpperCase() + word.slice(1);
      });
    }
    function splitOptionFlags(flags) {
      let shortFlag;
      let longFlag;
      const shortFlagExp = /^-[^-]$/;
      const longFlagExp = /^--[^-]/;
      const flagParts = flags.split(/[ |,]+/).concat("guard");
      if (shortFlagExp.test(flagParts[0])) shortFlag = flagParts.shift();
      if (longFlagExp.test(flagParts[0])) longFlag = flagParts.shift();
      if (!shortFlag && shortFlagExp.test(flagParts[0]))
        shortFlag = flagParts.shift();
      if (!shortFlag && longFlagExp.test(flagParts[0])) {
        shortFlag = longFlag;
        longFlag = flagParts.shift();
      }
      if (flagParts[0].startsWith("-")) {
        const unsupportedFlag = flagParts[0];
        const baseError = `option creation failed due to '${unsupportedFlag}' in option flags '${flags}'`;
        if (/^-[^-][^-]/.test(unsupportedFlag))
          throw new Error(
            `${baseError}
- a short flag is a single dash and a single character
  - either use a single dash and a single character (for a short flag)
  - or use a double dash for a long option (and can have two, like '--ws, --workspace')`
          );
        if (shortFlagExp.test(unsupportedFlag))
          throw new Error(`${baseError}
- too many short flags`);
        if (longFlagExp.test(unsupportedFlag))
          throw new Error(`${baseError}
- too many long flags`);
        throw new Error(`${baseError}
- unrecognised flag format`);
      }
      if (shortFlag === void 0 && longFlag === void 0)
        throw new Error(
          `option creation failed due to no flags found in '${flags}'.`
        );
      return { shortFlag, longFlag };
    }
    exports2.Option = Option2;
    exports2.DualOptions = DualOptions;
  }
});

// ../../node_modules/.pnpm/commander@13.1.0/node_modules/commander/lib/suggestSimilar.js
var require_suggestSimilar = __commonJS({
  "../../node_modules/.pnpm/commander@13.1.0/node_modules/commander/lib/suggestSimilar.js"(exports2) {
    "use strict";
    var maxDistance = 3;
    function editDistance(a, b) {
      if (Math.abs(a.length - b.length) > maxDistance)
        return Math.max(a.length, b.length);
      const d = [];
      for (let i = 0; i <= a.length; i++) {
        d[i] = [i];
      }
      for (let j = 0; j <= b.length; j++) {
        d[0][j] = j;
      }
      for (let j = 1; j <= b.length; j++) {
        for (let i = 1; i <= a.length; i++) {
          let cost = 1;
          if (a[i - 1] === b[j - 1]) {
            cost = 0;
          } else {
            cost = 1;
          }
          d[i][j] = Math.min(
            d[i - 1][j] + 1,
            // deletion
            d[i][j - 1] + 1,
            // insertion
            d[i - 1][j - 1] + cost
            // substitution
          );
          if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
            d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
          }
        }
      }
      return d[a.length][b.length];
    }
    function suggestSimilar(word, candidates) {
      if (!candidates || candidates.length === 0) return "";
      candidates = Array.from(new Set(candidates));
      const searchingOptions = word.startsWith("--");
      if (searchingOptions) {
        word = word.slice(2);
        candidates = candidates.map((candidate) => candidate.slice(2));
      }
      let similar = [];
      let bestDistance = maxDistance;
      const minSimilarity = 0.4;
      candidates.forEach((candidate) => {
        if (candidate.length <= 1) return;
        const distance = editDistance(word, candidate);
        const length = Math.max(word.length, candidate.length);
        const similarity = (length - distance) / length;
        if (similarity > minSimilarity) {
          if (distance < bestDistance) {
            bestDistance = distance;
            similar = [candidate];
          } else if (distance === bestDistance) {
            similar.push(candidate);
          }
        }
      });
      similar.sort((a, b) => a.localeCompare(b));
      if (searchingOptions) {
        similar = similar.map((candidate) => `--${candidate}`);
      }
      if (similar.length > 1) {
        return `
(Did you mean one of ${similar.join(", ")}?)`;
      }
      if (similar.length === 1) {
        return `
(Did you mean ${similar[0]}?)`;
      }
      return "";
    }
    exports2.suggestSimilar = suggestSimilar;
  }
});

// ../../node_modules/.pnpm/commander@13.1.0/node_modules/commander/lib/command.js
var require_command = __commonJS({
  "../../node_modules/.pnpm/commander@13.1.0/node_modules/commander/lib/command.js"(exports2) {
    "use strict";
    var EventEmitter = require("events").EventEmitter;
    var childProcess = require("child_process");
    var path = require("path");
    var fs = require("fs");
    var process2 = require("process");
    var { Argument: Argument2, humanReadableArgName } = require_argument();
    var { CommanderError: CommanderError2 } = require_error();
    var { Help: Help2, stripColor } = require_help();
    var { Option: Option2, DualOptions } = require_option();
    var { suggestSimilar } = require_suggestSimilar();
    var Command2 = class _Command extends EventEmitter {
      /**
       * Initialize a new `Command`.
       *
       * @param {string} [name]
       */
      constructor(name) {
        super();
        this.commands = [];
        this.options = [];
        this.parent = null;
        this._allowUnknownOption = false;
        this._allowExcessArguments = false;
        this.registeredArguments = [];
        this._args = this.registeredArguments;
        this.args = [];
        this.rawArgs = [];
        this.processedArgs = [];
        this._scriptPath = null;
        this._name = name || "";
        this._optionValues = {};
        this._optionValueSources = {};
        this._storeOptionsAsProperties = false;
        this._actionHandler = null;
        this._executableHandler = false;
        this._executableFile = null;
        this._executableDir = null;
        this._defaultCommandName = null;
        this._exitCallback = null;
        this._aliases = [];
        this._combineFlagAndOptionalValue = true;
        this._description = "";
        this._summary = "";
        this._argsDescription = void 0;
        this._enablePositionalOptions = false;
        this._passThroughOptions = false;
        this._lifeCycleHooks = {};
        this._showHelpAfterError = false;
        this._showSuggestionAfterError = true;
        this._savedState = null;
        this._outputConfiguration = {
          writeOut: (str) => process2.stdout.write(str),
          writeErr: (str) => process2.stderr.write(str),
          outputError: (str, write) => write(str),
          getOutHelpWidth: () => process2.stdout.isTTY ? process2.stdout.columns : void 0,
          getErrHelpWidth: () => process2.stderr.isTTY ? process2.stderr.columns : void 0,
          getOutHasColors: () => useColor() ?? (process2.stdout.isTTY && process2.stdout.hasColors?.()),
          getErrHasColors: () => useColor() ?? (process2.stderr.isTTY && process2.stderr.hasColors?.()),
          stripColor: (str) => stripColor(str)
        };
        this._hidden = false;
        this._helpOption = void 0;
        this._addImplicitHelpCommand = void 0;
        this._helpCommand = void 0;
        this._helpConfiguration = {};
      }
      /**
       * Copy settings that are useful to have in common across root command and subcommands.
       *
       * (Used internally when adding a command using `.command()` so subcommands inherit parent settings.)
       *
       * @param {Command} sourceCommand
       * @return {Command} `this` command for chaining
       */
      copyInheritedSettings(sourceCommand) {
        this._outputConfiguration = sourceCommand._outputConfiguration;
        this._helpOption = sourceCommand._helpOption;
        this._helpCommand = sourceCommand._helpCommand;
        this._helpConfiguration = sourceCommand._helpConfiguration;
        this._exitCallback = sourceCommand._exitCallback;
        this._storeOptionsAsProperties = sourceCommand._storeOptionsAsProperties;
        this._combineFlagAndOptionalValue = sourceCommand._combineFlagAndOptionalValue;
        this._allowExcessArguments = sourceCommand._allowExcessArguments;
        this._enablePositionalOptions = sourceCommand._enablePositionalOptions;
        this._showHelpAfterError = sourceCommand._showHelpAfterError;
        this._showSuggestionAfterError = sourceCommand._showSuggestionAfterError;
        return this;
      }
      /**
       * @returns {Command[]}
       * @private
       */
      _getCommandAndAncestors() {
        const result = [];
        for (let command = this; command; command = command.parent) {
          result.push(command);
        }
        return result;
      }
      /**
       * Define a command.
       *
       * There are two styles of command: pay attention to where to put the description.
       *
       * @example
       * // Command implemented using action handler (description is supplied separately to `.command`)
       * program
       *   .command('clone <source> [destination]')
       *   .description('clone a repository into a newly created directory')
       *   .action((source, destination) => {
       *     console.log('clone command called');
       *   });
       *
       * // Command implemented using separate executable file (description is second parameter to `.command`)
       * program
       *   .command('start <service>', 'start named service')
       *   .command('stop [service]', 'stop named service, or all if no name supplied');
       *
       * @param {string} nameAndArgs - command name and arguments, args are `<required>` or `[optional]` and last may also be `variadic...`
       * @param {(object | string)} [actionOptsOrExecDesc] - configuration options (for action), or description (for executable)
       * @param {object} [execOpts] - configuration options (for executable)
       * @return {Command} returns new command for action handler, or `this` for executable command
       */
      command(nameAndArgs, actionOptsOrExecDesc, execOpts) {
        let desc = actionOptsOrExecDesc;
        let opts = execOpts;
        if (typeof desc === "object" && desc !== null) {
          opts = desc;
          desc = null;
        }
        opts = opts || {};
        const [, name, args] = nameAndArgs.match(/([^ ]+) *(.*)/);
        const cmd = this.createCommand(name);
        if (desc) {
          cmd.description(desc);
          cmd._executableHandler = true;
        }
        if (opts.isDefault) this._defaultCommandName = cmd._name;
        cmd._hidden = !!(opts.noHelp || opts.hidden);
        cmd._executableFile = opts.executableFile || null;
        if (args) cmd.arguments(args);
        this._registerCommand(cmd);
        cmd.parent = this;
        cmd.copyInheritedSettings(this);
        if (desc) return this;
        return cmd;
      }
      /**
       * Factory routine to create a new unattached command.
       *
       * See .command() for creating an attached subcommand, which uses this routine to
       * create the command. You can override createCommand to customise subcommands.
       *
       * @param {string} [name]
       * @return {Command} new command
       */
      createCommand(name) {
        return new _Command(name);
      }
      /**
       * You can customise the help with a subclass of Help by overriding createHelp,
       * or by overriding Help properties using configureHelp().
       *
       * @return {Help}
       */
      createHelp() {
        return Object.assign(new Help2(), this.configureHelp());
      }
      /**
       * You can customise the help by overriding Help properties using configureHelp(),
       * or with a subclass of Help by overriding createHelp().
       *
       * @param {object} [configuration] - configuration options
       * @return {(Command | object)} `this` command for chaining, or stored configuration
       */
      configureHelp(configuration) {
        if (configuration === void 0) return this._helpConfiguration;
        this._helpConfiguration = configuration;
        return this;
      }
      /**
       * The default output goes to stdout and stderr. You can customise this for special
       * applications. You can also customise the display of errors by overriding outputError.
       *
       * The configuration properties are all functions:
       *
       *     // change how output being written, defaults to stdout and stderr
       *     writeOut(str)
       *     writeErr(str)
       *     // change how output being written for errors, defaults to writeErr
       *     outputError(str, write) // used for displaying errors and not used for displaying help
       *     // specify width for wrapping help
       *     getOutHelpWidth()
       *     getErrHelpWidth()
       *     // color support, currently only used with Help
       *     getOutHasColors()
       *     getErrHasColors()
       *     stripColor() // used to remove ANSI escape codes if output does not have colors
       *
       * @param {object} [configuration] - configuration options
       * @return {(Command | object)} `this` command for chaining, or stored configuration
       */
      configureOutput(configuration) {
        if (configuration === void 0) return this._outputConfiguration;
        Object.assign(this._outputConfiguration, configuration);
        return this;
      }
      /**
       * Display the help or a custom message after an error occurs.
       *
       * @param {(boolean|string)} [displayHelp]
       * @return {Command} `this` command for chaining
       */
      showHelpAfterError(displayHelp = true) {
        if (typeof displayHelp !== "string") displayHelp = !!displayHelp;
        this._showHelpAfterError = displayHelp;
        return this;
      }
      /**
       * Display suggestion of similar commands for unknown commands, or options for unknown options.
       *
       * @param {boolean} [displaySuggestion]
       * @return {Command} `this` command for chaining
       */
      showSuggestionAfterError(displaySuggestion = true) {
        this._showSuggestionAfterError = !!displaySuggestion;
        return this;
      }
      /**
       * Add a prepared subcommand.
       *
       * See .command() for creating an attached subcommand which inherits settings from its parent.
       *
       * @param {Command} cmd - new subcommand
       * @param {object} [opts] - configuration options
       * @return {Command} `this` command for chaining
       */
      addCommand(cmd, opts) {
        if (!cmd._name) {
          throw new Error(`Command passed to .addCommand() must have a name
- specify the name in Command constructor or using .name()`);
        }
        opts = opts || {};
        if (opts.isDefault) this._defaultCommandName = cmd._name;
        if (opts.noHelp || opts.hidden) cmd._hidden = true;
        this._registerCommand(cmd);
        cmd.parent = this;
        cmd._checkForBrokenPassThrough();
        return this;
      }
      /**
       * Factory routine to create a new unattached argument.
       *
       * See .argument() for creating an attached argument, which uses this routine to
       * create the argument. You can override createArgument to return a custom argument.
       *
       * @param {string} name
       * @param {string} [description]
       * @return {Argument} new argument
       */
      createArgument(name, description) {
        return new Argument2(name, description);
      }
      /**
       * Define argument syntax for command.
       *
       * The default is that the argument is required, and you can explicitly
       * indicate this with <> around the name. Put [] around the name for an optional argument.
       *
       * @example
       * program.argument('<input-file>');
       * program.argument('[output-file]');
       *
       * @param {string} name
       * @param {string} [description]
       * @param {(Function|*)} [fn] - custom argument processing function
       * @param {*} [defaultValue]
       * @return {Command} `this` command for chaining
       */
      argument(name, description, fn, defaultValue) {
        const argument = this.createArgument(name, description);
        if (typeof fn === "function") {
          argument.default(defaultValue).argParser(fn);
        } else {
          argument.default(fn);
        }
        this.addArgument(argument);
        return this;
      }
      /**
       * Define argument syntax for command, adding multiple at once (without descriptions).
       *
       * See also .argument().
       *
       * @example
       * program.arguments('<cmd> [env]');
       *
       * @param {string} names
       * @return {Command} `this` command for chaining
       */
      arguments(names) {
        names.trim().split(/ +/).forEach((detail) => {
          this.argument(detail);
        });
        return this;
      }
      /**
       * Define argument syntax for command, adding a prepared argument.
       *
       * @param {Argument} argument
       * @return {Command} `this` command for chaining
       */
      addArgument(argument) {
        const previousArgument = this.registeredArguments.slice(-1)[0];
        if (previousArgument && previousArgument.variadic) {
          throw new Error(
            `only the last argument can be variadic '${previousArgument.name()}'`
          );
        }
        if (argument.required && argument.defaultValue !== void 0 && argument.parseArg === void 0) {
          throw new Error(
            `a default value for a required argument is never used: '${argument.name()}'`
          );
        }
        this.registeredArguments.push(argument);
        return this;
      }
      /**
       * Customise or override default help command. By default a help command is automatically added if your command has subcommands.
       *
       * @example
       *    program.helpCommand('help [cmd]');
       *    program.helpCommand('help [cmd]', 'show help');
       *    program.helpCommand(false); // suppress default help command
       *    program.helpCommand(true); // add help command even if no subcommands
       *
       * @param {string|boolean} enableOrNameAndArgs - enable with custom name and/or arguments, or boolean to override whether added
       * @param {string} [description] - custom description
       * @return {Command} `this` command for chaining
       */
      helpCommand(enableOrNameAndArgs, description) {
        if (typeof enableOrNameAndArgs === "boolean") {
          this._addImplicitHelpCommand = enableOrNameAndArgs;
          return this;
        }
        enableOrNameAndArgs = enableOrNameAndArgs ?? "help [command]";
        const [, helpName, helpArgs] = enableOrNameAndArgs.match(/([^ ]+) *(.*)/);
        const helpDescription = description ?? "display help for command";
        const helpCommand = this.createCommand(helpName);
        helpCommand.helpOption(false);
        if (helpArgs) helpCommand.arguments(helpArgs);
        if (helpDescription) helpCommand.description(helpDescription);
        this._addImplicitHelpCommand = true;
        this._helpCommand = helpCommand;
        return this;
      }
      /**
       * Add prepared custom help command.
       *
       * @param {(Command|string|boolean)} helpCommand - custom help command, or deprecated enableOrNameAndArgs as for `.helpCommand()`
       * @param {string} [deprecatedDescription] - deprecated custom description used with custom name only
       * @return {Command} `this` command for chaining
       */
      addHelpCommand(helpCommand, deprecatedDescription) {
        if (typeof helpCommand !== "object") {
          this.helpCommand(helpCommand, deprecatedDescription);
          return this;
        }
        this._addImplicitHelpCommand = true;
        this._helpCommand = helpCommand;
        return this;
      }
      /**
       * Lazy create help command.
       *
       * @return {(Command|null)}
       * @package
       */
      _getHelpCommand() {
        const hasImplicitHelpCommand = this._addImplicitHelpCommand ?? (this.commands.length && !this._actionHandler && !this._findCommand("help"));
        if (hasImplicitHelpCommand) {
          if (this._helpCommand === void 0) {
            this.helpCommand(void 0, void 0);
          }
          return this._helpCommand;
        }
        return null;
      }
      /**
       * Add hook for life cycle event.
       *
       * @param {string} event
       * @param {Function} listener
       * @return {Command} `this` command for chaining
       */
      hook(event, listener) {
        const allowedValues = ["preSubcommand", "preAction", "postAction"];
        if (!allowedValues.includes(event)) {
          throw new Error(`Unexpected value for event passed to hook : '${event}'.
Expecting one of '${allowedValues.join("', '")}'`);
        }
        if (this._lifeCycleHooks[event]) {
          this._lifeCycleHooks[event].push(listener);
        } else {
          this._lifeCycleHooks[event] = [listener];
        }
        return this;
      }
      /**
       * Register callback to use as replacement for calling process.exit.
       *
       * @param {Function} [fn] optional callback which will be passed a CommanderError, defaults to throwing
       * @return {Command} `this` command for chaining
       */
      exitOverride(fn) {
        if (fn) {
          this._exitCallback = fn;
        } else {
          this._exitCallback = (err) => {
            if (err.code !== "commander.executeSubCommandAsync") {
              throw err;
            } else {
            }
          };
        }
        return this;
      }
      /**
       * Call process.exit, and _exitCallback if defined.
       *
       * @param {number} exitCode exit code for using with process.exit
       * @param {string} code an id string representing the error
       * @param {string} message human-readable description of the error
       * @return never
       * @private
       */
      _exit(exitCode, code, message) {
        if (this._exitCallback) {
          this._exitCallback(new CommanderError2(exitCode, code, message));
        }
        process2.exit(exitCode);
      }
      /**
       * Register callback `fn` for the command.
       *
       * @example
       * program
       *   .command('serve')
       *   .description('start service')
       *   .action(function() {
       *      // do work here
       *   });
       *
       * @param {Function} fn
       * @return {Command} `this` command for chaining
       */
      action(fn) {
        const listener = (args) => {
          const expectedArgsCount = this.registeredArguments.length;
          const actionArgs = args.slice(0, expectedArgsCount);
          if (this._storeOptionsAsProperties) {
            actionArgs[expectedArgsCount] = this;
          } else {
            actionArgs[expectedArgsCount] = this.opts();
          }
          actionArgs.push(this);
          return fn.apply(this, actionArgs);
        };
        this._actionHandler = listener;
        return this;
      }
      /**
       * Factory routine to create a new unattached option.
       *
       * See .option() for creating an attached option, which uses this routine to
       * create the option. You can override createOption to return a custom option.
       *
       * @param {string} flags
       * @param {string} [description]
       * @return {Option} new option
       */
      createOption(flags, description) {
        return new Option2(flags, description);
      }
      /**
       * Wrap parseArgs to catch 'commander.invalidArgument'.
       *
       * @param {(Option | Argument)} target
       * @param {string} value
       * @param {*} previous
       * @param {string} invalidArgumentMessage
       * @private
       */
      _callParseArg(target, value, previous, invalidArgumentMessage) {
        try {
          return target.parseArg(value, previous);
        } catch (err) {
          if (err.code === "commander.invalidArgument") {
            const message = `${invalidArgumentMessage} ${err.message}`;
            this.error(message, { exitCode: err.exitCode, code: err.code });
          }
          throw err;
        }
      }
      /**
       * Check for option flag conflicts.
       * Register option if no conflicts found, or throw on conflict.
       *
       * @param {Option} option
       * @private
       */
      _registerOption(option) {
        const matchingOption = option.short && this._findOption(option.short) || option.long && this._findOption(option.long);
        if (matchingOption) {
          const matchingFlag = option.long && this._findOption(option.long) ? option.long : option.short;
          throw new Error(`Cannot add option '${option.flags}'${this._name && ` to command '${this._name}'`} due to conflicting flag '${matchingFlag}'
-  already used by option '${matchingOption.flags}'`);
        }
        this.options.push(option);
      }
      /**
       * Check for command name and alias conflicts with existing commands.
       * Register command if no conflicts found, or throw on conflict.
       *
       * @param {Command} command
       * @private
       */
      _registerCommand(command) {
        const knownBy = (cmd) => {
          return [cmd.name()].concat(cmd.aliases());
        };
        const alreadyUsed = knownBy(command).find(
          (name) => this._findCommand(name)
        );
        if (alreadyUsed) {
          const existingCmd = knownBy(this._findCommand(alreadyUsed)).join("|");
          const newCmd = knownBy(command).join("|");
          throw new Error(
            `cannot add command '${newCmd}' as already have command '${existingCmd}'`
          );
        }
        this.commands.push(command);
      }
      /**
       * Add an option.
       *
       * @param {Option} option
       * @return {Command} `this` command for chaining
       */
      addOption(option) {
        this._registerOption(option);
        const oname = option.name();
        const name = option.attributeName();
        if (option.negate) {
          const positiveLongFlag = option.long.replace(/^--no-/, "--");
          if (!this._findOption(positiveLongFlag)) {
            this.setOptionValueWithSource(
              name,
              option.defaultValue === void 0 ? true : option.defaultValue,
              "default"
            );
          }
        } else if (option.defaultValue !== void 0) {
          this.setOptionValueWithSource(name, option.defaultValue, "default");
        }
        const handleOptionValue = (val, invalidValueMessage, valueSource) => {
          if (val == null && option.presetArg !== void 0) {
            val = option.presetArg;
          }
          const oldValue = this.getOptionValue(name);
          if (val !== null && option.parseArg) {
            val = this._callParseArg(option, val, oldValue, invalidValueMessage);
          } else if (val !== null && option.variadic) {
            val = option._concatValue(val, oldValue);
          }
          if (val == null) {
            if (option.negate) {
              val = false;
            } else if (option.isBoolean() || option.optional) {
              val = true;
            } else {
              val = "";
            }
          }
          this.setOptionValueWithSource(name, val, valueSource);
        };
        this.on("option:" + oname, (val) => {
          const invalidValueMessage = `error: option '${option.flags}' argument '${val}' is invalid.`;
          handleOptionValue(val, invalidValueMessage, "cli");
        });
        if (option.envVar) {
          this.on("optionEnv:" + oname, (val) => {
            const invalidValueMessage = `error: option '${option.flags}' value '${val}' from env '${option.envVar}' is invalid.`;
            handleOptionValue(val, invalidValueMessage, "env");
          });
        }
        return this;
      }
      /**
       * Internal implementation shared by .option() and .requiredOption()
       *
       * @return {Command} `this` command for chaining
       * @private
       */
      _optionEx(config, flags, description, fn, defaultValue) {
        if (typeof flags === "object" && flags instanceof Option2) {
          throw new Error(
            "To add an Option object use addOption() instead of option() or requiredOption()"
          );
        }
        const option = this.createOption(flags, description);
        option.makeOptionMandatory(!!config.mandatory);
        if (typeof fn === "function") {
          option.default(defaultValue).argParser(fn);
        } else if (fn instanceof RegExp) {
          const regex = fn;
          fn = (val, def) => {
            const m = regex.exec(val);
            return m ? m[0] : def;
          };
          option.default(defaultValue).argParser(fn);
        } else {
          option.default(fn);
        }
        return this.addOption(option);
      }
      /**
       * Define option with `flags`, `description`, and optional argument parsing function or `defaultValue` or both.
       *
       * The `flags` string contains the short and/or long flags, separated by comma, a pipe or space. A required
       * option-argument is indicated by `<>` and an optional option-argument by `[]`.
       *
       * See the README for more details, and see also addOption() and requiredOption().
       *
       * @example
       * program
       *     .option('-p, --pepper', 'add pepper')
       *     .option('--pt, --pizza-type <TYPE>', 'type of pizza') // required option-argument
       *     .option('-c, --cheese [CHEESE]', 'add extra cheese', 'mozzarella') // optional option-argument with default
       *     .option('-t, --tip <VALUE>', 'add tip to purchase cost', parseFloat) // custom parse function
       *
       * @param {string} flags
       * @param {string} [description]
       * @param {(Function|*)} [parseArg] - custom option processing function or default value
       * @param {*} [defaultValue]
       * @return {Command} `this` command for chaining
       */
      option(flags, description, parseArg, defaultValue) {
        return this._optionEx({}, flags, description, parseArg, defaultValue);
      }
      /**
       * Add a required option which must have a value after parsing. This usually means
       * the option must be specified on the command line. (Otherwise the same as .option().)
       *
       * The `flags` string contains the short and/or long flags, separated by comma, a pipe or space.
       *
       * @param {string} flags
       * @param {string} [description]
       * @param {(Function|*)} [parseArg] - custom option processing function or default value
       * @param {*} [defaultValue]
       * @return {Command} `this` command for chaining
       */
      requiredOption(flags, description, parseArg, defaultValue) {
        return this._optionEx(
          { mandatory: true },
          flags,
          description,
          parseArg,
          defaultValue
        );
      }
      /**
       * Alter parsing of short flags with optional values.
       *
       * @example
       * // for `.option('-f,--flag [value]'):
       * program.combineFlagAndOptionalValue(true);  // `-f80` is treated like `--flag=80`, this is the default behaviour
       * program.combineFlagAndOptionalValue(false) // `-fb` is treated like `-f -b`
       *
       * @param {boolean} [combine] - if `true` or omitted, an optional value can be specified directly after the flag.
       * @return {Command} `this` command for chaining
       */
      combineFlagAndOptionalValue(combine = true) {
        this._combineFlagAndOptionalValue = !!combine;
        return this;
      }
      /**
       * Allow unknown options on the command line.
       *
       * @param {boolean} [allowUnknown] - if `true` or omitted, no error will be thrown for unknown options.
       * @return {Command} `this` command for chaining
       */
      allowUnknownOption(allowUnknown = true) {
        this._allowUnknownOption = !!allowUnknown;
        return this;
      }
      /**
       * Allow excess command-arguments on the command line. Pass false to make excess arguments an error.
       *
       * @param {boolean} [allowExcess] - if `true` or omitted, no error will be thrown for excess arguments.
       * @return {Command} `this` command for chaining
       */
      allowExcessArguments(allowExcess = true) {
        this._allowExcessArguments = !!allowExcess;
        return this;
      }
      /**
       * Enable positional options. Positional means global options are specified before subcommands which lets
       * subcommands reuse the same option names, and also enables subcommands to turn on passThroughOptions.
       * The default behaviour is non-positional and global options may appear anywhere on the command line.
       *
       * @param {boolean} [positional]
       * @return {Command} `this` command for chaining
       */
      enablePositionalOptions(positional = true) {
        this._enablePositionalOptions = !!positional;
        return this;
      }
      /**
       * Pass through options that come after command-arguments rather than treat them as command-options,
       * so actual command-options come before command-arguments. Turning this on for a subcommand requires
       * positional options to have been enabled on the program (parent commands).
       * The default behaviour is non-positional and options may appear before or after command-arguments.
       *
       * @param {boolean} [passThrough] for unknown options.
       * @return {Command} `this` command for chaining
       */
      passThroughOptions(passThrough = true) {
        this._passThroughOptions = !!passThrough;
        this._checkForBrokenPassThrough();
        return this;
      }
      /**
       * @private
       */
      _checkForBrokenPassThrough() {
        if (this.parent && this._passThroughOptions && !this.parent._enablePositionalOptions) {
          throw new Error(
            `passThroughOptions cannot be used for '${this._name}' without turning on enablePositionalOptions for parent command(s)`
          );
        }
      }
      /**
       * Whether to store option values as properties on command object,
       * or store separately (specify false). In both cases the option values can be accessed using .opts().
       *
       * @param {boolean} [storeAsProperties=true]
       * @return {Command} `this` command for chaining
       */
      storeOptionsAsProperties(storeAsProperties = true) {
        if (this.options.length) {
          throw new Error("call .storeOptionsAsProperties() before adding options");
        }
        if (Object.keys(this._optionValues).length) {
          throw new Error(
            "call .storeOptionsAsProperties() before setting option values"
          );
        }
        this._storeOptionsAsProperties = !!storeAsProperties;
        return this;
      }
      /**
       * Retrieve option value.
       *
       * @param {string} key
       * @return {object} value
       */
      getOptionValue(key) {
        if (this._storeOptionsAsProperties) {
          return this[key];
        }
        return this._optionValues[key];
      }
      /**
       * Store option value.
       *
       * @param {string} key
       * @param {object} value
       * @return {Command} `this` command for chaining
       */
      setOptionValue(key, value) {
        return this.setOptionValueWithSource(key, value, void 0);
      }
      /**
       * Store option value and where the value came from.
       *
       * @param {string} key
       * @param {object} value
       * @param {string} source - expected values are default/config/env/cli/implied
       * @return {Command} `this` command for chaining
       */
      setOptionValueWithSource(key, value, source) {
        if (this._storeOptionsAsProperties) {
          this[key] = value;
        } else {
          this._optionValues[key] = value;
        }
        this._optionValueSources[key] = source;
        return this;
      }
      /**
       * Get source of option value.
       * Expected values are default | config | env | cli | implied
       *
       * @param {string} key
       * @return {string}
       */
      getOptionValueSource(key) {
        return this._optionValueSources[key];
      }
      /**
       * Get source of option value. See also .optsWithGlobals().
       * Expected values are default | config | env | cli | implied
       *
       * @param {string} key
       * @return {string}
       */
      getOptionValueSourceWithGlobals(key) {
        let source;
        this._getCommandAndAncestors().forEach((cmd) => {
          if (cmd.getOptionValueSource(key) !== void 0) {
            source = cmd.getOptionValueSource(key);
          }
        });
        return source;
      }
      /**
       * Get user arguments from implied or explicit arguments.
       * Side-effects: set _scriptPath if args included script. Used for default program name, and subcommand searches.
       *
       * @private
       */
      _prepareUserArgs(argv, parseOptions) {
        if (argv !== void 0 && !Array.isArray(argv)) {
          throw new Error("first parameter to parse must be array or undefined");
        }
        parseOptions = parseOptions || {};
        if (argv === void 0 && parseOptions.from === void 0) {
          if (process2.versions?.electron) {
            parseOptions.from = "electron";
          }
          const execArgv = process2.execArgv ?? [];
          if (execArgv.includes("-e") || execArgv.includes("--eval") || execArgv.includes("-p") || execArgv.includes("--print")) {
            parseOptions.from = "eval";
          }
        }
        if (argv === void 0) {
          argv = process2.argv;
        }
        this.rawArgs = argv.slice();
        let userArgs;
        switch (parseOptions.from) {
          case void 0:
          case "node":
            this._scriptPath = argv[1];
            userArgs = argv.slice(2);
            break;
          case "electron":
            if (process2.defaultApp) {
              this._scriptPath = argv[1];
              userArgs = argv.slice(2);
            } else {
              userArgs = argv.slice(1);
            }
            break;
          case "user":
            userArgs = argv.slice(0);
            break;
          case "eval":
            userArgs = argv.slice(1);
            break;
          default:
            throw new Error(
              `unexpected parse option { from: '${parseOptions.from}' }`
            );
        }
        if (!this._name && this._scriptPath)
          this.nameFromFilename(this._scriptPath);
        this._name = this._name || "program";
        return userArgs;
      }
      /**
       * Parse `argv`, setting options and invoking commands when defined.
       *
       * Use parseAsync instead of parse if any of your action handlers are async.
       *
       * Call with no parameters to parse `process.argv`. Detects Electron and special node options like `node --eval`. Easy mode!
       *
       * Or call with an array of strings to parse, and optionally where the user arguments start by specifying where the arguments are `from`:
       * - `'node'`: default, `argv[0]` is the application and `argv[1]` is the script being run, with user arguments after that
       * - `'electron'`: `argv[0]` is the application and `argv[1]` varies depending on whether the electron application is packaged
       * - `'user'`: just user arguments
       *
       * @example
       * program.parse(); // parse process.argv and auto-detect electron and special node flags
       * program.parse(process.argv); // assume argv[0] is app and argv[1] is script
       * program.parse(my-args, { from: 'user' }); // just user supplied arguments, nothing special about argv[0]
       *
       * @param {string[]} [argv] - optional, defaults to process.argv
       * @param {object} [parseOptions] - optionally specify style of options with from: node/user/electron
       * @param {string} [parseOptions.from] - where the args are from: 'node', 'user', 'electron'
       * @return {Command} `this` command for chaining
       */
      parse(argv, parseOptions) {
        this._prepareForParse();
        const userArgs = this._prepareUserArgs(argv, parseOptions);
        this._parseCommand([], userArgs);
        return this;
      }
      /**
       * Parse `argv`, setting options and invoking commands when defined.
       *
       * Call with no parameters to parse `process.argv`. Detects Electron and special node options like `node --eval`. Easy mode!
       *
       * Or call with an array of strings to parse, and optionally where the user arguments start by specifying where the arguments are `from`:
       * - `'node'`: default, `argv[0]` is the application and `argv[1]` is the script being run, with user arguments after that
       * - `'electron'`: `argv[0]` is the application and `argv[1]` varies depending on whether the electron application is packaged
       * - `'user'`: just user arguments
       *
       * @example
       * await program.parseAsync(); // parse process.argv and auto-detect electron and special node flags
       * await program.parseAsync(process.argv); // assume argv[0] is app and argv[1] is script
       * await program.parseAsync(my-args, { from: 'user' }); // just user supplied arguments, nothing special about argv[0]
       *
       * @param {string[]} [argv]
       * @param {object} [parseOptions]
       * @param {string} parseOptions.from - where the args are from: 'node', 'user', 'electron'
       * @return {Promise}
       */
      async parseAsync(argv, parseOptions) {
        this._prepareForParse();
        const userArgs = this._prepareUserArgs(argv, parseOptions);
        await this._parseCommand([], userArgs);
        return this;
      }
      _prepareForParse() {
        if (this._savedState === null) {
          this.saveStateBeforeParse();
        } else {
          this.restoreStateBeforeParse();
        }
      }
      /**
       * Called the first time parse is called to save state and allow a restore before subsequent calls to parse.
       * Not usually called directly, but available for subclasses to save their custom state.
       *
       * This is called in a lazy way. Only commands used in parsing chain will have state saved.
       */
      saveStateBeforeParse() {
        this._savedState = {
          // name is stable if supplied by author, but may be unspecified for root command and deduced during parsing
          _name: this._name,
          // option values before parse have default values (including false for negated options)
          // shallow clones
          _optionValues: { ...this._optionValues },
          _optionValueSources: { ...this._optionValueSources }
        };
      }
      /**
       * Restore state before parse for calls after the first.
       * Not usually called directly, but available for subclasses to save their custom state.
       *
       * This is called in a lazy way. Only commands used in parsing chain will have state restored.
       */
      restoreStateBeforeParse() {
        if (this._storeOptionsAsProperties)
          throw new Error(`Can not call parse again when storeOptionsAsProperties is true.
- either make a new Command for each call to parse, or stop storing options as properties`);
        this._name = this._savedState._name;
        this._scriptPath = null;
        this.rawArgs = [];
        this._optionValues = { ...this._savedState._optionValues };
        this._optionValueSources = { ...this._savedState._optionValueSources };
        this.args = [];
        this.processedArgs = [];
      }
      /**
       * Throw if expected executable is missing. Add lots of help for author.
       *
       * @param {string} executableFile
       * @param {string} executableDir
       * @param {string} subcommandName
       */
      _checkForMissingExecutable(executableFile, executableDir, subcommandName) {
        if (fs.existsSync(executableFile)) return;
        const executableDirMessage = executableDir ? `searched for local subcommand relative to directory '${executableDir}'` : "no directory for search for local subcommand, use .executableDir() to supply a custom directory";
        const executableMissing = `'${executableFile}' does not exist
 - if '${subcommandName}' is not meant to be an executable command, remove description parameter from '.command()' and use '.description()' instead
 - if the default executable name is not suitable, use the executableFile option to supply a custom name or path
 - ${executableDirMessage}`;
        throw new Error(executableMissing);
      }
      /**
       * Execute a sub-command executable.
       *
       * @private
       */
      _executeSubCommand(subcommand, args) {
        args = args.slice();
        let launchWithNode = false;
        const sourceExt = [".js", ".ts", ".tsx", ".mjs", ".cjs"];
        function findFile(baseDir, baseName) {
          const localBin = path.resolve(baseDir, baseName);
          if (fs.existsSync(localBin)) return localBin;
          if (sourceExt.includes(path.extname(baseName))) return void 0;
          const foundExt = sourceExt.find(
            (ext) => fs.existsSync(`${localBin}${ext}`)
          );
          if (foundExt) return `${localBin}${foundExt}`;
          return void 0;
        }
        this._checkForMissingMandatoryOptions();
        this._checkForConflictingOptions();
        let executableFile = subcommand._executableFile || `${this._name}-${subcommand._name}`;
        let executableDir = this._executableDir || "";
        if (this._scriptPath) {
          let resolvedScriptPath;
          try {
            resolvedScriptPath = fs.realpathSync(this._scriptPath);
          } catch {
            resolvedScriptPath = this._scriptPath;
          }
          executableDir = path.resolve(
            path.dirname(resolvedScriptPath),
            executableDir
          );
        }
        if (executableDir) {
          let localFile = findFile(executableDir, executableFile);
          if (!localFile && !subcommand._executableFile && this._scriptPath) {
            const legacyName = path.basename(
              this._scriptPath,
              path.extname(this._scriptPath)
            );
            if (legacyName !== this._name) {
              localFile = findFile(
                executableDir,
                `${legacyName}-${subcommand._name}`
              );
            }
          }
          executableFile = localFile || executableFile;
        }
        launchWithNode = sourceExt.includes(path.extname(executableFile));
        let proc;
        if (process2.platform !== "win32") {
          if (launchWithNode) {
            args.unshift(executableFile);
            args = incrementNodeInspectorPort(process2.execArgv).concat(args);
            proc = childProcess.spawn(process2.argv[0], args, { stdio: "inherit" });
          } else {
            proc = childProcess.spawn(executableFile, args, { stdio: "inherit" });
          }
        } else {
          this._checkForMissingExecutable(
            executableFile,
            executableDir,
            subcommand._name
          );
          args.unshift(executableFile);
          args = incrementNodeInspectorPort(process2.execArgv).concat(args);
          proc = childProcess.spawn(process2.execPath, args, { stdio: "inherit" });
        }
        if (!proc.killed) {
          const signals = ["SIGUSR1", "SIGUSR2", "SIGTERM", "SIGINT", "SIGHUP"];
          signals.forEach((signal) => {
            process2.on(signal, () => {
              if (proc.killed === false && proc.exitCode === null) {
                proc.kill(signal);
              }
            });
          });
        }
        const exitCallback = this._exitCallback;
        proc.on("close", (code) => {
          code = code ?? 1;
          if (!exitCallback) {
            process2.exit(code);
          } else {
            exitCallback(
              new CommanderError2(
                code,
                "commander.executeSubCommandAsync",
                "(close)"
              )
            );
          }
        });
        proc.on("error", (err) => {
          if (err.code === "ENOENT") {
            this._checkForMissingExecutable(
              executableFile,
              executableDir,
              subcommand._name
            );
          } else if (err.code === "EACCES") {
            throw new Error(`'${executableFile}' not executable`);
          }
          if (!exitCallback) {
            process2.exit(1);
          } else {
            const wrappedError = new CommanderError2(
              1,
              "commander.executeSubCommandAsync",
              "(error)"
            );
            wrappedError.nestedError = err;
            exitCallback(wrappedError);
          }
        });
        this.runningCommand = proc;
      }
      /**
       * @private
       */
      _dispatchSubcommand(commandName, operands, unknown) {
        const subCommand = this._findCommand(commandName);
        if (!subCommand) this.help({ error: true });
        subCommand._prepareForParse();
        let promiseChain;
        promiseChain = this._chainOrCallSubCommandHook(
          promiseChain,
          subCommand,
          "preSubcommand"
        );
        promiseChain = this._chainOrCall(promiseChain, () => {
          if (subCommand._executableHandler) {
            this._executeSubCommand(subCommand, operands.concat(unknown));
          } else {
            return subCommand._parseCommand(operands, unknown);
          }
        });
        return promiseChain;
      }
      /**
       * Invoke help directly if possible, or dispatch if necessary.
       * e.g. help foo
       *
       * @private
       */
      _dispatchHelpCommand(subcommandName) {
        if (!subcommandName) {
          this.help();
        }
        const subCommand = this._findCommand(subcommandName);
        if (subCommand && !subCommand._executableHandler) {
          subCommand.help();
        }
        return this._dispatchSubcommand(
          subcommandName,
          [],
          [this._getHelpOption()?.long ?? this._getHelpOption()?.short ?? "--help"]
        );
      }
      /**
       * Check this.args against expected this.registeredArguments.
       *
       * @private
       */
      _checkNumberOfArguments() {
        this.registeredArguments.forEach((arg, i) => {
          if (arg.required && this.args[i] == null) {
            this.missingArgument(arg.name());
          }
        });
        if (this.registeredArguments.length > 0 && this.registeredArguments[this.registeredArguments.length - 1].variadic) {
          return;
        }
        if (this.args.length > this.registeredArguments.length) {
          this._excessArguments(this.args);
        }
      }
      /**
       * Process this.args using this.registeredArguments and save as this.processedArgs!
       *
       * @private
       */
      _processArguments() {
        const myParseArg = (argument, value, previous) => {
          let parsedValue = value;
          if (value !== null && argument.parseArg) {
            const invalidValueMessage = `error: command-argument value '${value}' is invalid for argument '${argument.name()}'.`;
            parsedValue = this._callParseArg(
              argument,
              value,
              previous,
              invalidValueMessage
            );
          }
          return parsedValue;
        };
        this._checkNumberOfArguments();
        const processedArgs = [];
        this.registeredArguments.forEach((declaredArg, index) => {
          let value = declaredArg.defaultValue;
          if (declaredArg.variadic) {
            if (index < this.args.length) {
              value = this.args.slice(index);
              if (declaredArg.parseArg) {
                value = value.reduce((processed, v) => {
                  return myParseArg(declaredArg, v, processed);
                }, declaredArg.defaultValue);
              }
            } else if (value === void 0) {
              value = [];
            }
          } else if (index < this.args.length) {
            value = this.args[index];
            if (declaredArg.parseArg) {
              value = myParseArg(declaredArg, value, declaredArg.defaultValue);
            }
          }
          processedArgs[index] = value;
        });
        this.processedArgs = processedArgs;
      }
      /**
       * Once we have a promise we chain, but call synchronously until then.
       *
       * @param {(Promise|undefined)} promise
       * @param {Function} fn
       * @return {(Promise|undefined)}
       * @private
       */
      _chainOrCall(promise, fn) {
        if (promise && promise.then && typeof promise.then === "function") {
          return promise.then(() => fn());
        }
        return fn();
      }
      /**
       *
       * @param {(Promise|undefined)} promise
       * @param {string} event
       * @return {(Promise|undefined)}
       * @private
       */
      _chainOrCallHooks(promise, event) {
        let result = promise;
        const hooks = [];
        this._getCommandAndAncestors().reverse().filter((cmd) => cmd._lifeCycleHooks[event] !== void 0).forEach((hookedCommand) => {
          hookedCommand._lifeCycleHooks[event].forEach((callback) => {
            hooks.push({ hookedCommand, callback });
          });
        });
        if (event === "postAction") {
          hooks.reverse();
        }
        hooks.forEach((hookDetail) => {
          result = this._chainOrCall(result, () => {
            return hookDetail.callback(hookDetail.hookedCommand, this);
          });
        });
        return result;
      }
      /**
       *
       * @param {(Promise|undefined)} promise
       * @param {Command} subCommand
       * @param {string} event
       * @return {(Promise|undefined)}
       * @private
       */
      _chainOrCallSubCommandHook(promise, subCommand, event) {
        let result = promise;
        if (this._lifeCycleHooks[event] !== void 0) {
          this._lifeCycleHooks[event].forEach((hook) => {
            result = this._chainOrCall(result, () => {
              return hook(this, subCommand);
            });
          });
        }
        return result;
      }
      /**
       * Process arguments in context of this command.
       * Returns action result, in case it is a promise.
       *
       * @private
       */
      _parseCommand(operands, unknown) {
        const parsed = this.parseOptions(unknown);
        this._parseOptionsEnv();
        this._parseOptionsImplied();
        operands = operands.concat(parsed.operands);
        unknown = parsed.unknown;
        this.args = operands.concat(unknown);
        if (operands && this._findCommand(operands[0])) {
          return this._dispatchSubcommand(operands[0], operands.slice(1), unknown);
        }
        if (this._getHelpCommand() && operands[0] === this._getHelpCommand().name()) {
          return this._dispatchHelpCommand(operands[1]);
        }
        if (this._defaultCommandName) {
          this._outputHelpIfRequested(unknown);
          return this._dispatchSubcommand(
            this._defaultCommandName,
            operands,
            unknown
          );
        }
        if (this.commands.length && this.args.length === 0 && !this._actionHandler && !this._defaultCommandName) {
          this.help({ error: true });
        }
        this._outputHelpIfRequested(parsed.unknown);
        this._checkForMissingMandatoryOptions();
        this._checkForConflictingOptions();
        const checkForUnknownOptions = () => {
          if (parsed.unknown.length > 0) {
            this.unknownOption(parsed.unknown[0]);
          }
        };
        const commandEvent = `command:${this.name()}`;
        if (this._actionHandler) {
          checkForUnknownOptions();
          this._processArguments();
          let promiseChain;
          promiseChain = this._chainOrCallHooks(promiseChain, "preAction");
          promiseChain = this._chainOrCall(
            promiseChain,
            () => this._actionHandler(this.processedArgs)
          );
          if (this.parent) {
            promiseChain = this._chainOrCall(promiseChain, () => {
              this.parent.emit(commandEvent, operands, unknown);
            });
          }
          promiseChain = this._chainOrCallHooks(promiseChain, "postAction");
          return promiseChain;
        }
        if (this.parent && this.parent.listenerCount(commandEvent)) {
          checkForUnknownOptions();
          this._processArguments();
          this.parent.emit(commandEvent, operands, unknown);
        } else if (operands.length) {
          if (this._findCommand("*")) {
            return this._dispatchSubcommand("*", operands, unknown);
          }
          if (this.listenerCount("command:*")) {
            this.emit("command:*", operands, unknown);
          } else if (this.commands.length) {
            this.unknownCommand();
          } else {
            checkForUnknownOptions();
            this._processArguments();
          }
        } else if (this.commands.length) {
          checkForUnknownOptions();
          this.help({ error: true });
        } else {
          checkForUnknownOptions();
          this._processArguments();
        }
      }
      /**
       * Find matching command.
       *
       * @private
       * @return {Command | undefined}
       */
      _findCommand(name) {
        if (!name) return void 0;
        return this.commands.find(
          (cmd) => cmd._name === name || cmd._aliases.includes(name)
        );
      }
      /**
       * Return an option matching `arg` if any.
       *
       * @param {string} arg
       * @return {Option}
       * @package
       */
      _findOption(arg) {
        return this.options.find((option) => option.is(arg));
      }
      /**
       * Display an error message if a mandatory option does not have a value.
       * Called after checking for help flags in leaf subcommand.
       *
       * @private
       */
      _checkForMissingMandatoryOptions() {
        this._getCommandAndAncestors().forEach((cmd) => {
          cmd.options.forEach((anOption) => {
            if (anOption.mandatory && cmd.getOptionValue(anOption.attributeName()) === void 0) {
              cmd.missingMandatoryOptionValue(anOption);
            }
          });
        });
      }
      /**
       * Display an error message if conflicting options are used together in this.
       *
       * @private
       */
      _checkForConflictingLocalOptions() {
        const definedNonDefaultOptions = this.options.filter((option) => {
          const optionKey = option.attributeName();
          if (this.getOptionValue(optionKey) === void 0) {
            return false;
          }
          return this.getOptionValueSource(optionKey) !== "default";
        });
        const optionsWithConflicting = definedNonDefaultOptions.filter(
          (option) => option.conflictsWith.length > 0
        );
        optionsWithConflicting.forEach((option) => {
          const conflictingAndDefined = definedNonDefaultOptions.find(
            (defined) => option.conflictsWith.includes(defined.attributeName())
          );
          if (conflictingAndDefined) {
            this._conflictingOption(option, conflictingAndDefined);
          }
        });
      }
      /**
       * Display an error message if conflicting options are used together.
       * Called after checking for help flags in leaf subcommand.
       *
       * @private
       */
      _checkForConflictingOptions() {
        this._getCommandAndAncestors().forEach((cmd) => {
          cmd._checkForConflictingLocalOptions();
        });
      }
      /**
       * Parse options from `argv` removing known options,
       * and return argv split into operands and unknown arguments.
       *
       * Side effects: modifies command by storing options. Does not reset state if called again.
       *
       * Examples:
       *
       *     argv => operands, unknown
       *     --known kkk op => [op], []
       *     op --known kkk => [op], []
       *     sub --unknown uuu op => [sub], [--unknown uuu op]
       *     sub -- --unknown uuu op => [sub --unknown uuu op], []
       *
       * @param {string[]} argv
       * @return {{operands: string[], unknown: string[]}}
       */
      parseOptions(argv) {
        const operands = [];
        const unknown = [];
        let dest = operands;
        const args = argv.slice();
        function maybeOption(arg) {
          return arg.length > 1 && arg[0] === "-";
        }
        let activeVariadicOption = null;
        while (args.length) {
          const arg = args.shift();
          if (arg === "--") {
            if (dest === unknown) dest.push(arg);
            dest.push(...args);
            break;
          }
          if (activeVariadicOption && !maybeOption(arg)) {
            this.emit(`option:${activeVariadicOption.name()}`, arg);
            continue;
          }
          activeVariadicOption = null;
          if (maybeOption(arg)) {
            const option = this._findOption(arg);
            if (option) {
              if (option.required) {
                const value = args.shift();
                if (value === void 0) this.optionMissingArgument(option);
                this.emit(`option:${option.name()}`, value);
              } else if (option.optional) {
                let value = null;
                if (args.length > 0 && !maybeOption(args[0])) {
                  value = args.shift();
                }
                this.emit(`option:${option.name()}`, value);
              } else {
                this.emit(`option:${option.name()}`);
              }
              activeVariadicOption = option.variadic ? option : null;
              continue;
            }
          }
          if (arg.length > 2 && arg[0] === "-" && arg[1] !== "-") {
            const option = this._findOption(`-${arg[1]}`);
            if (option) {
              if (option.required || option.optional && this._combineFlagAndOptionalValue) {
                this.emit(`option:${option.name()}`, arg.slice(2));
              } else {
                this.emit(`option:${option.name()}`);
                args.unshift(`-${arg.slice(2)}`);
              }
              continue;
            }
          }
          if (/^--[^=]+=/.test(arg)) {
            const index = arg.indexOf("=");
            const option = this._findOption(arg.slice(0, index));
            if (option && (option.required || option.optional)) {
              this.emit(`option:${option.name()}`, arg.slice(index + 1));
              continue;
            }
          }
          if (maybeOption(arg)) {
            dest = unknown;
          }
          if ((this._enablePositionalOptions || this._passThroughOptions) && operands.length === 0 && unknown.length === 0) {
            if (this._findCommand(arg)) {
              operands.push(arg);
              if (args.length > 0) unknown.push(...args);
              break;
            } else if (this._getHelpCommand() && arg === this._getHelpCommand().name()) {
              operands.push(arg);
              if (args.length > 0) operands.push(...args);
              break;
            } else if (this._defaultCommandName) {
              unknown.push(arg);
              if (args.length > 0) unknown.push(...args);
              break;
            }
          }
          if (this._passThroughOptions) {
            dest.push(arg);
            if (args.length > 0) dest.push(...args);
            break;
          }
          dest.push(arg);
        }
        return { operands, unknown };
      }
      /**
       * Return an object containing local option values as key-value pairs.
       *
       * @return {object}
       */
      opts() {
        if (this._storeOptionsAsProperties) {
          const result = {};
          const len = this.options.length;
          for (let i = 0; i < len; i++) {
            const key = this.options[i].attributeName();
            result[key] = key === this._versionOptionName ? this._version : this[key];
          }
          return result;
        }
        return this._optionValues;
      }
      /**
       * Return an object containing merged local and global option values as key-value pairs.
       *
       * @return {object}
       */
      optsWithGlobals() {
        return this._getCommandAndAncestors().reduce(
          (combinedOptions, cmd) => Object.assign(combinedOptions, cmd.opts()),
          {}
        );
      }
      /**
       * Display error message and exit (or call exitOverride).
       *
       * @param {string} message
       * @param {object} [errorOptions]
       * @param {string} [errorOptions.code] - an id string representing the error
       * @param {number} [errorOptions.exitCode] - used with process.exit
       */
      error(message, errorOptions) {
        this._outputConfiguration.outputError(
          `${message}
`,
          this._outputConfiguration.writeErr
        );
        if (typeof this._showHelpAfterError === "string") {
          this._outputConfiguration.writeErr(`${this._showHelpAfterError}
`);
        } else if (this._showHelpAfterError) {
          this._outputConfiguration.writeErr("\n");
          this.outputHelp({ error: true });
        }
        const config = errorOptions || {};
        const exitCode = config.exitCode || 1;
        const code = config.code || "commander.error";
        this._exit(exitCode, code, message);
      }
      /**
       * Apply any option related environment variables, if option does
       * not have a value from cli or client code.
       *
       * @private
       */
      _parseOptionsEnv() {
        this.options.forEach((option) => {
          if (option.envVar && option.envVar in process2.env) {
            const optionKey = option.attributeName();
            if (this.getOptionValue(optionKey) === void 0 || ["default", "config", "env"].includes(
              this.getOptionValueSource(optionKey)
            )) {
              if (option.required || option.optional) {
                this.emit(`optionEnv:${option.name()}`, process2.env[option.envVar]);
              } else {
                this.emit(`optionEnv:${option.name()}`);
              }
            }
          }
        });
      }
      /**
       * Apply any implied option values, if option is undefined or default value.
       *
       * @private
       */
      _parseOptionsImplied() {
        const dualHelper = new DualOptions(this.options);
        const hasCustomOptionValue = (optionKey) => {
          return this.getOptionValue(optionKey) !== void 0 && !["default", "implied"].includes(this.getOptionValueSource(optionKey));
        };
        this.options.filter(
          (option) => option.implied !== void 0 && hasCustomOptionValue(option.attributeName()) && dualHelper.valueFromOption(
            this.getOptionValue(option.attributeName()),
            option
          )
        ).forEach((option) => {
          Object.keys(option.implied).filter((impliedKey) => !hasCustomOptionValue(impliedKey)).forEach((impliedKey) => {
            this.setOptionValueWithSource(
              impliedKey,
              option.implied[impliedKey],
              "implied"
            );
          });
        });
      }
      /**
       * Argument `name` is missing.
       *
       * @param {string} name
       * @private
       */
      missingArgument(name) {
        const message = `error: missing required argument '${name}'`;
        this.error(message, { code: "commander.missingArgument" });
      }
      /**
       * `Option` is missing an argument.
       *
       * @param {Option} option
       * @private
       */
      optionMissingArgument(option) {
        const message = `error: option '${option.flags}' argument missing`;
        this.error(message, { code: "commander.optionMissingArgument" });
      }
      /**
       * `Option` does not have a value, and is a mandatory option.
       *
       * @param {Option} option
       * @private
       */
      missingMandatoryOptionValue(option) {
        const message = `error: required option '${option.flags}' not specified`;
        this.error(message, { code: "commander.missingMandatoryOptionValue" });
      }
      /**
       * `Option` conflicts with another option.
       *
       * @param {Option} option
       * @param {Option} conflictingOption
       * @private
       */
      _conflictingOption(option, conflictingOption) {
        const findBestOptionFromValue = (option2) => {
          const optionKey = option2.attributeName();
          const optionValue = this.getOptionValue(optionKey);
          const negativeOption = this.options.find(
            (target) => target.negate && optionKey === target.attributeName()
          );
          const positiveOption = this.options.find(
            (target) => !target.negate && optionKey === target.attributeName()
          );
          if (negativeOption && (negativeOption.presetArg === void 0 && optionValue === false || negativeOption.presetArg !== void 0 && optionValue === negativeOption.presetArg)) {
            return negativeOption;
          }
          return positiveOption || option2;
        };
        const getErrorMessage = (option2) => {
          const bestOption = findBestOptionFromValue(option2);
          const optionKey = bestOption.attributeName();
          const source = this.getOptionValueSource(optionKey);
          if (source === "env") {
            return `environment variable '${bestOption.envVar}'`;
          }
          return `option '${bestOption.flags}'`;
        };
        const message = `error: ${getErrorMessage(option)} cannot be used with ${getErrorMessage(conflictingOption)}`;
        this.error(message, { code: "commander.conflictingOption" });
      }
      /**
       * Unknown option `flag`.
       *
       * @param {string} flag
       * @private
       */
      unknownOption(flag) {
        if (this._allowUnknownOption) return;
        let suggestion = "";
        if (flag.startsWith("--") && this._showSuggestionAfterError) {
          let candidateFlags = [];
          let command = this;
          do {
            const moreFlags = command.createHelp().visibleOptions(command).filter((option) => option.long).map((option) => option.long);
            candidateFlags = candidateFlags.concat(moreFlags);
            command = command.parent;
          } while (command && !command._enablePositionalOptions);
          suggestion = suggestSimilar(flag, candidateFlags);
        }
        const message = `error: unknown option '${flag}'${suggestion}`;
        this.error(message, { code: "commander.unknownOption" });
      }
      /**
       * Excess arguments, more than expected.
       *
       * @param {string[]} receivedArgs
       * @private
       */
      _excessArguments(receivedArgs) {
        if (this._allowExcessArguments) return;
        const expected = this.registeredArguments.length;
        const s = expected === 1 ? "" : "s";
        const forSubcommand = this.parent ? ` for '${this.name()}'` : "";
        const message = `error: too many arguments${forSubcommand}. Expected ${expected} argument${s} but got ${receivedArgs.length}.`;
        this.error(message, { code: "commander.excessArguments" });
      }
      /**
       * Unknown command.
       *
       * @private
       */
      unknownCommand() {
        const unknownName = this.args[0];
        let suggestion = "";
        if (this._showSuggestionAfterError) {
          const candidateNames = [];
          this.createHelp().visibleCommands(this).forEach((command) => {
            candidateNames.push(command.name());
            if (command.alias()) candidateNames.push(command.alias());
          });
          suggestion = suggestSimilar(unknownName, candidateNames);
        }
        const message = `error: unknown command '${unknownName}'${suggestion}`;
        this.error(message, { code: "commander.unknownCommand" });
      }
      /**
       * Get or set the program version.
       *
       * This method auto-registers the "-V, --version" option which will print the version number.
       *
       * You can optionally supply the flags and description to override the defaults.
       *
       * @param {string} [str]
       * @param {string} [flags]
       * @param {string} [description]
       * @return {(this | string | undefined)} `this` command for chaining, or version string if no arguments
       */
      version(str, flags, description) {
        if (str === void 0) return this._version;
        this._version = str;
        flags = flags || "-V, --version";
        description = description || "output the version number";
        const versionOption = this.createOption(flags, description);
        this._versionOptionName = versionOption.attributeName();
        this._registerOption(versionOption);
        this.on("option:" + versionOption.name(), () => {
          this._outputConfiguration.writeOut(`${str}
`);
          this._exit(0, "commander.version", str);
        });
        return this;
      }
      /**
       * Set the description.
       *
       * @param {string} [str]
       * @param {object} [argsDescription]
       * @return {(string|Command)}
       */
      description(str, argsDescription) {
        if (str === void 0 && argsDescription === void 0)
          return this._description;
        this._description = str;
        if (argsDescription) {
          this._argsDescription = argsDescription;
        }
        return this;
      }
      /**
       * Set the summary. Used when listed as subcommand of parent.
       *
       * @param {string} [str]
       * @return {(string|Command)}
       */
      summary(str) {
        if (str === void 0) return this._summary;
        this._summary = str;
        return this;
      }
      /**
       * Set an alias for the command.
       *
       * You may call more than once to add multiple aliases. Only the first alias is shown in the auto-generated help.
       *
       * @param {string} [alias]
       * @return {(string|Command)}
       */
      alias(alias) {
        if (alias === void 0) return this._aliases[0];
        let command = this;
        if (this.commands.length !== 0 && this.commands[this.commands.length - 1]._executableHandler) {
          command = this.commands[this.commands.length - 1];
        }
        if (alias === command._name)
          throw new Error("Command alias can't be the same as its name");
        const matchingCommand = this.parent?._findCommand(alias);
        if (matchingCommand) {
          const existingCmd = [matchingCommand.name()].concat(matchingCommand.aliases()).join("|");
          throw new Error(
            `cannot add alias '${alias}' to command '${this.name()}' as already have command '${existingCmd}'`
          );
        }
        command._aliases.push(alias);
        return this;
      }
      /**
       * Set aliases for the command.
       *
       * Only the first alias is shown in the auto-generated help.
       *
       * @param {string[]} [aliases]
       * @return {(string[]|Command)}
       */
      aliases(aliases) {
        if (aliases === void 0) return this._aliases;
        aliases.forEach((alias) => this.alias(alias));
        return this;
      }
      /**
       * Set / get the command usage `str`.
       *
       * @param {string} [str]
       * @return {(string|Command)}
       */
      usage(str) {
        if (str === void 0) {
          if (this._usage) return this._usage;
          const args = this.registeredArguments.map((arg) => {
            return humanReadableArgName(arg);
          });
          return [].concat(
            this.options.length || this._helpOption !== null ? "[options]" : [],
            this.commands.length ? "[command]" : [],
            this.registeredArguments.length ? args : []
          ).join(" ");
        }
        this._usage = str;
        return this;
      }
      /**
       * Get or set the name of the command.
       *
       * @param {string} [str]
       * @return {(string|Command)}
       */
      name(str) {
        if (str === void 0) return this._name;
        this._name = str;
        return this;
      }
      /**
       * Set the name of the command from script filename, such as process.argv[1],
       * or require.main.filename, or __filename.
       *
       * (Used internally and public although not documented in README.)
       *
       * @example
       * program.nameFromFilename(require.main.filename);
       *
       * @param {string} filename
       * @return {Command}
       */
      nameFromFilename(filename) {
        this._name = path.basename(filename, path.extname(filename));
        return this;
      }
      /**
       * Get or set the directory for searching for executable subcommands of this command.
       *
       * @example
       * program.executableDir(__dirname);
       * // or
       * program.executableDir('subcommands');
       *
       * @param {string} [path]
       * @return {(string|null|Command)}
       */
      executableDir(path2) {
        if (path2 === void 0) return this._executableDir;
        this._executableDir = path2;
        return this;
      }
      /**
       * Return program help documentation.
       *
       * @param {{ error: boolean }} [contextOptions] - pass {error:true} to wrap for stderr instead of stdout
       * @return {string}
       */
      helpInformation(contextOptions) {
        const helper = this.createHelp();
        const context = this._getOutputContext(contextOptions);
        helper.prepareContext({
          error: context.error,
          helpWidth: context.helpWidth,
          outputHasColors: context.hasColors
        });
        const text = helper.formatHelp(this, helper);
        if (context.hasColors) return text;
        return this._outputConfiguration.stripColor(text);
      }
      /**
       * @typedef HelpContext
       * @type {object}
       * @property {boolean} error
       * @property {number} helpWidth
       * @property {boolean} hasColors
       * @property {function} write - includes stripColor if needed
       *
       * @returns {HelpContext}
       * @private
       */
      _getOutputContext(contextOptions) {
        contextOptions = contextOptions || {};
        const error = !!contextOptions.error;
        let baseWrite;
        let hasColors;
        let helpWidth;
        if (error) {
          baseWrite = (str) => this._outputConfiguration.writeErr(str);
          hasColors = this._outputConfiguration.getErrHasColors();
          helpWidth = this._outputConfiguration.getErrHelpWidth();
        } else {
          baseWrite = (str) => this._outputConfiguration.writeOut(str);
          hasColors = this._outputConfiguration.getOutHasColors();
          helpWidth = this._outputConfiguration.getOutHelpWidth();
        }
        const write = (str) => {
          if (!hasColors) str = this._outputConfiguration.stripColor(str);
          return baseWrite(str);
        };
        return { error, write, hasColors, helpWidth };
      }
      /**
       * Output help information for this command.
       *
       * Outputs built-in help, and custom text added using `.addHelpText()`.
       *
       * @param {{ error: boolean } | Function} [contextOptions] - pass {error:true} to write to stderr instead of stdout
       */
      outputHelp(contextOptions) {
        let deprecatedCallback;
        if (typeof contextOptions === "function") {
          deprecatedCallback = contextOptions;
          contextOptions = void 0;
        }
        const outputContext = this._getOutputContext(contextOptions);
        const eventContext = {
          error: outputContext.error,
          write: outputContext.write,
          command: this
        };
        this._getCommandAndAncestors().reverse().forEach((command) => command.emit("beforeAllHelp", eventContext));
        this.emit("beforeHelp", eventContext);
        let helpInformation = this.helpInformation({ error: outputContext.error });
        if (deprecatedCallback) {
          helpInformation = deprecatedCallback(helpInformation);
          if (typeof helpInformation !== "string" && !Buffer.isBuffer(helpInformation)) {
            throw new Error("outputHelp callback must return a string or a Buffer");
          }
        }
        outputContext.write(helpInformation);
        if (this._getHelpOption()?.long) {
          this.emit(this._getHelpOption().long);
        }
        this.emit("afterHelp", eventContext);
        this._getCommandAndAncestors().forEach(
          (command) => command.emit("afterAllHelp", eventContext)
        );
      }
      /**
       * You can pass in flags and a description to customise the built-in help option.
       * Pass in false to disable the built-in help option.
       *
       * @example
       * program.helpOption('-?, --help' 'show help'); // customise
       * program.helpOption(false); // disable
       *
       * @param {(string | boolean)} flags
       * @param {string} [description]
       * @return {Command} `this` command for chaining
       */
      helpOption(flags, description) {
        if (typeof flags === "boolean") {
          if (flags) {
            this._helpOption = this._helpOption ?? void 0;
          } else {
            this._helpOption = null;
          }
          return this;
        }
        flags = flags ?? "-h, --help";
        description = description ?? "display help for command";
        this._helpOption = this.createOption(flags, description);
        return this;
      }
      /**
       * Lazy create help option.
       * Returns null if has been disabled with .helpOption(false).
       *
       * @returns {(Option | null)} the help option
       * @package
       */
      _getHelpOption() {
        if (this._helpOption === void 0) {
          this.helpOption(void 0, void 0);
        }
        return this._helpOption;
      }
      /**
       * Supply your own option to use for the built-in help option.
       * This is an alternative to using helpOption() to customise the flags and description etc.
       *
       * @param {Option} option
       * @return {Command} `this` command for chaining
       */
      addHelpOption(option) {
        this._helpOption = option;
        return this;
      }
      /**
       * Output help information and exit.
       *
       * Outputs built-in help, and custom text added using `.addHelpText()`.
       *
       * @param {{ error: boolean }} [contextOptions] - pass {error:true} to write to stderr instead of stdout
       */
      help(contextOptions) {
        this.outputHelp(contextOptions);
        let exitCode = Number(process2.exitCode ?? 0);
        if (exitCode === 0 && contextOptions && typeof contextOptions !== "function" && contextOptions.error) {
          exitCode = 1;
        }
        this._exit(exitCode, "commander.help", "(outputHelp)");
      }
      /**
       * // Do a little typing to coordinate emit and listener for the help text events.
       * @typedef HelpTextEventContext
       * @type {object}
       * @property {boolean} error
       * @property {Command} command
       * @property {function} write
       */
      /**
       * Add additional text to be displayed with the built-in help.
       *
       * Position is 'before' or 'after' to affect just this command,
       * and 'beforeAll' or 'afterAll' to affect this command and all its subcommands.
       *
       * @param {string} position - before or after built-in help
       * @param {(string | Function)} text - string to add, or a function returning a string
       * @return {Command} `this` command for chaining
       */
      addHelpText(position, text) {
        const allowedValues = ["beforeAll", "before", "after", "afterAll"];
        if (!allowedValues.includes(position)) {
          throw new Error(`Unexpected value for position to addHelpText.
Expecting one of '${allowedValues.join("', '")}'`);
        }
        const helpEvent = `${position}Help`;
        this.on(helpEvent, (context) => {
          let helpStr;
          if (typeof text === "function") {
            helpStr = text({ error: context.error, command: context.command });
          } else {
            helpStr = text;
          }
          if (helpStr) {
            context.write(`${helpStr}
`);
          }
        });
        return this;
      }
      /**
       * Output help information if help flags specified
       *
       * @param {Array} args - array of options to search for help flags
       * @private
       */
      _outputHelpIfRequested(args) {
        const helpOption = this._getHelpOption();
        const helpRequested = helpOption && args.find((arg) => helpOption.is(arg));
        if (helpRequested) {
          this.outputHelp();
          this._exit(0, "commander.helpDisplayed", "(outputHelp)");
        }
      }
    };
    function incrementNodeInspectorPort(args) {
      return args.map((arg) => {
        if (!arg.startsWith("--inspect")) {
          return arg;
        }
        let debugOption;
        let debugHost = "127.0.0.1";
        let debugPort = "9229";
        let match;
        if ((match = arg.match(/^(--inspect(-brk)?)$/)) !== null) {
          debugOption = match[1];
        } else if ((match = arg.match(/^(--inspect(-brk|-port)?)=([^:]+)$/)) !== null) {
          debugOption = match[1];
          if (/^\d+$/.test(match[3])) {
            debugPort = match[3];
          } else {
            debugHost = match[3];
          }
        } else if ((match = arg.match(/^(--inspect(-brk|-port)?)=([^:]+):(\d+)$/)) !== null) {
          debugOption = match[1];
          debugHost = match[3];
          debugPort = match[4];
        }
        if (debugOption && debugPort !== "0") {
          return `${debugOption}=${debugHost}:${parseInt(debugPort) + 1}`;
        }
        return arg;
      });
    }
    function useColor() {
      if (process2.env.NO_COLOR || process2.env.FORCE_COLOR === "0" || process2.env.FORCE_COLOR === "false")
        return false;
      if (process2.env.FORCE_COLOR || process2.env.CLICOLOR_FORCE !== void 0)
        return true;
      return void 0;
    }
    exports2.Command = Command2;
    exports2.useColor = useColor;
  }
});

// ../../node_modules/.pnpm/commander@13.1.0/node_modules/commander/index.js
var require_commander = __commonJS({
  "../../node_modules/.pnpm/commander@13.1.0/node_modules/commander/index.js"(exports2) {
    "use strict";
    var { Argument: Argument2 } = require_argument();
    var { Command: Command2 } = require_command();
    var { CommanderError: CommanderError2, InvalidArgumentError: InvalidArgumentError2 } = require_error();
    var { Help: Help2 } = require_help();
    var { Option: Option2 } = require_option();
    exports2.program = new Command2();
    exports2.createCommand = (name) => new Command2(name);
    exports2.createOption = (flags, description) => new Option2(flags, description);
    exports2.createArgument = (name, description) => new Argument2(name, description);
    exports2.Command = Command2;
    exports2.Option = Option2;
    exports2.Argument = Argument2;
    exports2.Help = Help2;
    exports2.CommanderError = CommanderError2;
    exports2.InvalidArgumentError = InvalidArgumentError2;
    exports2.InvalidOptionArgumentError = InvalidArgumentError2;
  }
});

// src/action.ts
var import_node_fs2 = require("fs");

// ../../node_modules/.pnpm/commander@13.1.0/node_modules/commander/esm.mjs
var import_index = __toESM(require_commander(), 1);
var {
  program,
  createCommand,
  createArgument,
  createOption,
  CommanderError,
  InvalidArgumentError,
  InvalidOptionArgumentError,
  // deprecated old name
  Command,
  Argument,
  Option,
  Help
} = import_index.default;

// src/push.ts
var import_node_child_process = require("child_process");
var import_node_crypto = require("crypto");
var import_node_fs = require("fs");
var import_node_https = require("https");
var import_node_http = require("http");
var import_node_os = require("os");
var import_node_path = require("path");
var import_node_zlib = require("zlib");

// ../components/convex/lib/secretLiterals.ts
var URL_CREDENTIAL = "(?<=\\b[A-Za-z][A-Za-z0-9+.-]{1,30}://[^\\s\\x00-\\x1f\\x7f:/?#@\"'`<>\\\\]{0,128}:)[^\\s\\x00-\\x1f\\x7f/@\"'`\\\\]+(?:@[^\\s\\x00-\\x1f\\x7f/@?#\"'`\\\\]+)*(?=@(?:[A-Za-z0-9_-]+(?:\\.[A-Za-z0-9_-]+)*|\\[[0-9A-Fa-f:.]+\\]))";
var URL_PASSWORD_PLACEHOLDER = "^(?:password|passwd|pass|pwd|secret|changeme|change[_-]?me|example|sample|placeholder|redacted|your[_-]?pass(?:word)?|my[_-]?pass(?:word)?|x+|\\*+|\\.+|<[^>]*>|\\$\\{[^}]*\\}|\\$\\([^)]*\\)|\\$[A-Za-z_][A-Za-z0-9_]*|\\{\\{.*\\}\\}|\\{[^{}]*\\}|#\\{[^}]*\\}#?|%\\{[^}]*\\}|%\\([A-Za-z0-9_]+\\)[a-z]|%[A-Za-z0-9_]+%|%[-+ #0]*\\d*(?:\\.\\d+)?[a-zA-Z])$|DESSN_REDACTED";
var DB_PASSWORD_PLACEHOLDER = `${URL_PASSWORD_PLACEHOLDER}|^(?:pass(?:word)?|admin|demo|guest|user|root|postgres|postgresql|mysql|mariadb|mongo|redis|rabbitmq|test|qwerty|letmein|welcome|secret|abc|abcd)[-_]?\\d*!?$|^(?:true|false|null|none|nil|undefined|required|optional|hidden)$|^test|fake|dummy|example|sample|placeholder|changeme|mock|your|x{5}`;
var CONNECTION_PASSWORD_PLACEHOLDER = `${DB_PASSWORD_PLACEHOLDER}|^[A-Za-z_$]+(?:\\.[A-Za-z0-9_$]+)*(?:\\(.*\\))?$|\\|\\||&&|=>|[()\\[\\]]|^.{0,3}$`;
var CONNECTION_KEY = "\\b(?:server|data source|host|database|initial catalog|user id|uid|user|addr|address|network address)\\s*=";
var PEM_BEGIN = "-----BEGIN (?:RSA |EC |DSA |OPENSSH |ENCRYPTED |PGP )?PRIVATE KEY(?: BLOCK)?-----";
var SECRET_LITERALS = [
  // The whole block: to its END line, else (a key cut short) the base64 that follows, real line breaks or `\n` escapes.
  { kind: "private_key", source: PEM_BEGIN, span: "(?:[\\s\\S]{0,16000}?-----END (?:RSA |EC |DSA |OPENSSH |ENCRYPTED |PGP )?PRIVATE KEY(?: BLOCK)?-----|(?:[A-Za-z0-9+/=\\s]|\\\\[nr])*)", capture: true, staffCopy: true },
  { kind: "aws_access_key", source: "\\b(?:AKIA|ASIA)[0-9A-Z]{16}\\b", capture: true, staffCopy: true },
  { kind: "github_token", source: "\\b(?:ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9]{36,}\\b|\\bgithub_pat_[A-Za-z0-9_]{22,}\\b", capture: true, staffCopy: true },
  { kind: "gitlab_token", source: "\\bglpat-[A-Za-z0-9_-]{20,}\\b", capture: true, staffCopy: true },
  { kind: "slack_token", source: "\\bxox[abprs]-[A-Za-z0-9-]{10,}\\b", capture: true, staffCopy: true },
  { kind: "stripe_live_key", source: "\\b(?:sk|rk)_live_[A-Za-z0-9]{16,}\\b", capture: true, staffCopy: true },
  { kind: "stripe_test_key", source: "\\b(?:sk|rk)_test_[A-Za-z0-9]{16,}\\b", capture: false, staffCopy: true },
  // Notion's internal-integration tokens: `ntn_` (2024 on), `secret_` plus 43 (before).
  { kind: "notion_token", source: "\\bntn_[A-Za-z0-9]{40,}\\b", minClasses: 2, capture: false, staffCopy: true },
  { kind: "notion_token", source: "\\bsecret_[A-Za-z0-9]{43}\\b", minClasses: 3, capture: false, staffCopy: true },
  { kind: "anthropic_key", source: "\\bsk-ant-[A-Za-z0-9_-]{32,}", minClasses: 3, capture: false, staffCopy: true },
  { kind: "openai_key", source: "\\bsk-(?!ant-)(?:proj-|svcacct-|admin-)?[A-Za-z0-9_-]{32,}", minClasses: 3, capture: false, staffCopy: true },
  { kind: "google_api_key", source: "\\bAIza[0-9A-Za-z_-]{35}\\b", capture: true, staffCopy: true },
  // A service account's JSON: its key is the PEM block above for a copy; the capture names the file's kind.
  { kind: "service_account", source: '"private_key"\\s*:\\s*"-----BEGIN', capture: true, staffCopy: false },
  { kind: "npm_access_key", source: "\\bnpm_[A-Za-z0-9]{36}\\b", capture: true, staffCopy: true },
  // A password in a URL's user info: `postgres://u:realpw@host/db`, `redis://:pw@host`, `mongodb+srv://user:pw@cluster`. The
  // match is the password alone (look-behind for `scheme://user:`, look-ahead for `@host`), so its placeholder keeps the scheme,
  // the user and the host and the URL still parses. Not the capture's (it holds a file back for the prefixed kinds only).
  { kind: "url_credential", source: URL_CREDENTIAL, placeholder: URL_PASSWORD_PLACEHOLDER, capture: false, staffCopy: true },
  // A password in a URL's query: JDBC's `jdbc:postgresql://db/app?user=u&password=pw`, SQL Server's `;password=pw;`, libpq's `?password=pw`.
  { kind: "db_password", source: "(?<=(?:\\bjdbc:[^\\s\"'`]{0,300}|://[^\\s\"'`]{0,300})[?&;](?:password|passwd|pwd)=)[^&;\\s\"'`<>]+", placeholder: DB_PASSWORD_PLACEHOLDER, generic: true, ignoreCase: true, capture: false, staffCopy: true },
  // ADO.NET's connection string, `Server=db;User Id=u;Password=pw;`, the password after another key or before one. To the `;`: it may hold blanks.
  { kind: "db_password", source: `(?<=${CONNECTION_KEY}[^"'\`\\r\\n]{0,400};\\s*(?:password|pwd)\\s*=\\s*)[^;"'\`\\r\\n]+`, placeholder: CONNECTION_PASSWORD_PLACEHOLDER, generic: true, ignoreCase: true, capture: false, staffCopy: true },
  { kind: "db_password", source: `(?<=(?:^|[;"'\`\\s])(?:password|pwd)\\s*=\\s*)[^;"'\`\\r\\n]+(?=;\\s*${CONNECTION_KEY})`, placeholder: CONNECTION_PASSWORD_PLACEHOLDER, generic: true, ignoreCase: true, capture: false, staffCopy: true }
];
var GENERIC_NAME = "[A-Za-z0-9_.-]*?(?:secret|token|api_?key|private_?key|passw(?:or)?d|access_?key|auth_?key|signing_?key|client_?secret)[A-Za-z0-9_]*";
var GENERIC_QUOTED = `(?<![A-Za-z0-9_])(${GENERIC_NAME})["']?\\s*(?:[:=]|:=|=>)\\s*["'\`]([A-Za-z0-9_\\-+/=.]{24,})(?=["'\`])`;
var GENERIC_ENV = `^[ \\t]*(?:export[ \\t]+)?(${GENERIC_NAME})[ \\t]*=[ \\t]*["']?([^\\s"'#]{16,})`;
var PASSWORD_NAME = "[A-Za-z0-9_.-]*?(?:passw(?:or)?d|passphrase|[A-Za-z0-9]_pwd)[A-Za-z0-9_]*";
var PASSWORD_QUOTED = `(?<![A-Za-z0-9_])(${PASSWORD_NAME})["']?\\s*(?:[:=]|:=|=>)\\s*["'\`]([^"'\`\\s\\\\]+)(?=["'\`])`;
var PASSWORD_ASSIGN = `^[ \\t]*(?:export[ \\t]+|-[ \\t]+)?(${PASSWORD_NAME})[ \\t]*=[ \\t]*["']?([^\\s"'#]+)`;
var PASSWORD_YAML = `^[ \\t-]*(${PASSWORD_NAME})[ \\t]*:[ \\t]+([^\\s"'#{\\[&*!|>%$<][^\\s#]*)(?=[ \\t]*(?:#.*)?$)`;
var PUBLIC_GOOGLE_KEY_FILES = [
  "app.json",
  "app.config.js",
  "app.config.ts",
  "app.config.mjs",
  "app.config.cjs",
  "app.config.json",
  "google-services.json",
  "googleservice-info.plist",
  "firebase.json"
];
var FIREBASE_WEB_CONFIG = "\\bauthDomain\\b[\\s\\S]{0,400}\\b(?:projectId|appId|messagingSenderId)\\b|\\b(?:projectId|appId|messagingSenderId)\\b[\\s\\S]{0,400}\\bauthDomain\\b";

// ../components/convex/workspace/repoScout/upload/exclusions.ts
var lower = (text) => text.toLowerCase();
var baseOf = (path) => path.slice(path.lastIndexOf("/") + 1);
var DEPENDENCY_DIRS = /* @__PURE__ */ new Set([
  "node_modules",
  "bower_components",
  "jspm_packages",
  ".pnpm-store",
  ".venv",
  "venv",
  "__pypackages__"
]);
var DEPENDENCY_DIR_PATHS = [".yarn/cache", ".yarn/unplugged", "vendor/bundle", "ios/pods"];
var DEPENDENCY_FILE_PATHS = [".yarn/install-state.gz"];
var VCS_DIRS = /* @__PURE__ */ new Set([".git", ".hg", ".svn"]);
var BUILD_DIRS = /* @__PURE__ */ new Set([
  ".next",
  ".nuxt",
  ".output",
  ".svelte-kit",
  ".astro",
  ".expo",
  ".expo-shared",
  ".angular",
  ".nx",
  ".turbo",
  ".vercel",
  ".netlify",
  ".wrangler",
  ".serverless",
  ".firebase",
  ".parcel-cache",
  ".vite",
  ".docusaurus",
  ".cache",
  ".sass-cache",
  "storybook-static",
  ".nyc_output",
  "__pycache__",
  ".pytest_cache",
  ".mypy_cache",
  ".ruff_cache",
  ".tox",
  ".gradle",
  "deriveddata",
  ".dart_tool",
  ".terraform",
  ".direnv",
  ".devenv"
]);
var AMBIGUOUS_BUILD_DIRS = /* @__PURE__ */ new Set(["dist", "build", "out", "target", "tmp", ".tmp", "coverage"]);
var BUILD_FILE = /(?:\.tsbuildinfo|^\.eslintcache|\.log)$/u;
var OS_FILES = /* @__PURE__ */ new Set([".ds_store", "thumbs.db", "desktop.ini", "ehthumbs.db"]);
var OS_DIRS = /* @__PURE__ */ new Set([".spotlight-v100", ".trashes", ".fseventsd", ".temporaryitems"]);
var SECRET_DIRS = /* @__PURE__ */ new Set([".ssh", ".aws", ".azure", ".gcloud", ".gnupg", ".kube"]);
var ENV_EXAMPLES = /* @__PURE__ */ new Set([".env.example", ".env.sample", ".env.template", ".env.dist"]);
var SECRET_FILES = /* @__PURE__ */ new Set([
  ".dev.vars",
  ".envrc",
  ".netrc",
  ".pypirc",
  ".git-credentials",
  ".pgpass",
  ".my.cnf",
  ".s3cfg",
  ".boto",
  "kubeconfig",
  ".htpasswd",
  "credentials",
  "credentials.json",
  "id_rsa",
  "id_dsa",
  "id_ecdsa",
  "id_ed25519",
  // Tools' own sign-in files: Sentry's CLI token, Terraform's registry credentials.
  ".sentryclirc",
  ".terraformrc",
  "terraform.rc"
]);
var SECRET_FILE_PATTERNS = [
  /\.(?:pem|key|p8|p12|pfx|jks|keystore|mobileprovision|ovpn)$/u,
  /\.tfstate(?:\..+)?$/u,
  /\.tfvars(?:\.json)?$/u,
  /^service[-_]?account.*\.json$/u,
  /^firebase-adminsdk.*\.json$/u,
  /^credentials?[-.].*\.json$/u,
  /^secrets?\.(?:json|ya?ml|toml|env|txt)$/u
];
var SECRET_PATH_ENDINGS = [".docker/config.json", ".claude/settings.local.json"];
var VSCODE_ENV = /(?:^|\/)\.vscode\/[^/]*\.env$/u;
var endsWithPath = (path, ending) => path === ending || path.endsWith(`/${ending}`);
function isSecretFileName(name) {
  const base = lower(name);
  if (base === ".env") return true;
  if (/^\.env[._-]/u.test(base)) return !ENV_EXAMPLES.has(`.env.${base.slice(5)}`);
  return SECRET_FILES.has(base) || SECRET_FILE_PATTERNS.some((pattern) => pattern.test(base));
}
function excludedDirectory(name, options = {}) {
  const base = lower(name);
  const path = lower(options.path ?? name);
  if (VCS_DIRS.has(base)) return "vcs";
  if (DEPENDENCY_DIRS.has(base) || DEPENDENCY_DIR_PATHS.some((ending) => endsWithPath(path, ending))) return "dependencies";
  if (SECRET_DIRS.has(base)) return "secrets";
  if (OS_DIRS.has(base)) return "os";
  if (BUILD_DIRS.has(base)) return "build";
  if (AMBIGUOUS_BUILD_DIRS.has(base) && !options.governedByGitignore) return "build";
  return null;
}
function excludedFileName(path) {
  const lowered = lower(path);
  const base = baseOf(lowered);
  if (DEPENDENCY_FILE_PATHS.some((ending) => endsWithPath(lowered, ending))) return "dependencies";
  if (isSecretFileName(base) || SECRET_PATH_ENDINGS.some((ending) => endsWithPath(lowered, ending)) || VSCODE_ENV.test(lowered)) return "secrets";
  if (OS_FILES.has(base)) return "os";
  if (BUILD_FILE.test(base)) return "build";
  return null;
}
function excludedPath(path, options = {}) {
  const segments = path.split("/");
  for (let index = 0; index < segments.length - 1; index++) {
    const folder = segments.slice(0, index + 1).join("/");
    const kind = excludedDirectory(segments[index], { path: folder, governedByGitignore: options.governedByGitignore?.(folder) ?? false });
    if (kind) return kind;
  }
  return excludedFileName(path);
}
var REGISTRY_CONFIG_FILES = /* @__PURE__ */ new Set([".npmrc", ".yarnrc", ".yarnrc.yml"]);
var INI_SECRET_KEYS = /* @__PURE__ */ new Set(["_authtoken", "_auth", "_password", "password", "username", "email", "certfile", "keyfile"]);
var YARN_SECRET_KEYS = ["npmAuthToken", "npmAuthIdent", "npmPassword"];
var YAML_SECRET_KEY = new RegExp(`["']?(?:${YARN_SECRET_KEYS.join("|")})["']?\\s*:`, "gu");
var YAML_BLOCK_SECRET = new RegExp(`^\\s*(?:-\\s+)?["']?(?:${YARN_SECRET_KEYS.join("|")})["']?\\s*:(.*)$`, "u");
var ENV_ONLY = /^\s*["']?\$\{[A-Za-z_][A-Za-z0-9_]*(?::?[-?])?\}["']?\s*$/u;
var YAML_ENV_VALUE = /^\s*["']?\$\{[A-Za-z_][A-Za-z0-9_]*(?::?[-?])?\}["']?\s*(?:$|#|[,}\]])/u;
var URL_USERINFO = /[a-z][a-z0-9+.-]*:\/\/[^/\s@"']+@/iu;
function iniLine(line) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#") || trimmed.startsWith(";")) return null;
  const match = /^(?:"((?:[^"\\]|\\.)*)"|'([^']*)'|([^=\s]+))\s*(?:=|\s)\s*(.*)$/u.exec(trimmed);
  if (!match) return null;
  return { key: match[1] !== void 0 ? jsonString(match[1]) : match[2] ?? match[3], value: match[4] };
}
function jsonString(quoted) {
  try {
    return JSON.parse(`"${quoted}"`);
  } catch {
    return quoted;
  }
}
function yamlSignIn(line) {
  const keys = [...line.matchAll(YAML_SECRET_KEY)].filter((match) => !YAML_ENV_VALUE.test(line.slice(match.index + match[0].length)));
  if (keys.length === 0) return URL_USERINFO.test(line) ? "line" : null;
  if (line.trimStart().startsWith("#")) return "line";
  const block = YAML_BLOCK_SECRET.exec(line);
  if (!block || [...line.matchAll(YAML_SECRET_KEY)].length !== 1) return "flow";
  return /^\s*[{[&*!]/u.test(block[1]) ? "flow" : "block";
}
var indentOf = (line) => line.length - line.trimStart().length;
function flowDepthChange(line) {
  let change = 0;
  let quote = null;
  for (let at = 0; at < line.length; at++) {
    const char = line[at];
    if (quote) {
      if (char === "\\" && quote === '"') at++;
      else if (char === quote) quote = null;
    } else if (char === '"' || char === "'") quote = char;
    else if (char === "#" && (at === 0 || /\s/u.test(line[at - 1]))) break;
    else if (char === "{" || char === "[") change++;
    else if (char === "}" || char === "]") change--;
  }
  return change;
}
var YAML_NEXT_ENTRY = /^\s*(?:#|-(?:\s|$)|---|\.\.\.|(?:"[^"]*"|'[^']*'|[^\s"'#\-][^:#]*)\s*:(?:\s|$))/u;
function stripYarnYaml(text) {
  const lines = text.split(/(?<=\n|\r(?!\n))/u);
  const content = (line) => line.replace(/\r?\n$|\r$/u, "");
  const kept = [];
  let removed = 0;
  let held = false;
  let open = 0;
  for (let at = 0; at < lines.length; at++) {
    const line = content(lines[at]);
    const inFlow = open > 0;
    open = Math.max(0, open + flowDepthChange(line));
    const kind = yamlSignIn(line);
    if (kind === null) {
      kept.push(lines[at]);
      continue;
    }
    removed++;
    if (kind === "line") continue;
    if (kind === "flow" || inFlow) held = true;
    const indent = indentOf(line);
    let end = at + 1;
    let after = null;
    for (let next = at + 1; next < lines.length; next++) {
      const below = content(lines[next]);
      if (below.trim() === "") continue;
      if (indentOf(below) <= indent) {
        after = below;
        break;
      }
      end = next + 1;
    }
    const value = (YAML_BLOCK_SECRET.exec(line)?.[1] ?? "").replace(/(?:^|\s)#.*$/u, "").trim();
    if (value === "" && end === at + 1 && after !== null && !YAML_NEXT_ENTRY.test(after)) held = true;
    for (let skipped = at + 1; skipped < end; skipped++) open = Math.max(0, open + flowDepthChange(content(lines[skipped])));
    removed += end - at - 1;
    at = end - 1;
  }
  return { text: kept.join(""), removed, held };
}
var COMMENTED_SIGN_IN = /(?:^|[\s/:"'])(?:_authtoken|_auth|_password|password|username|email|certfile|keyfile)["']?(?:\s*=\s*(\S+)|\s+("[^"]*"|'[^']*'|[A-Za-z0-9+/=_.~-]{16,}))/giu;
function commentSignsIn(line) {
  return [...line.matchAll(COMMENTED_SIGN_IN)].some((match) => !ENV_ONLY.test(match[1] ?? match[2]));
}
function signsIn(fileName, line) {
  const base = lower(baseOf(fileName));
  if (base === ".yarnrc.yml") return yamlSignIn(line) !== null;
  const comment = /^\s*[#;]/u.test(line);
  if (comment && commentSignsIn(line)) return true;
  const entry = iniLine(comment ? line.replace(/^\s*(?:[#;]\s*)+/u, "") : line);
  if (!entry) return comment && URL_USERINFO.test(line);
  const key = lower(entry.key.slice(entry.key.lastIndexOf(":") + 1));
  if (INI_SECRET_KEYS.has(key)) return !ENV_ONLY.test(entry.value);
  return URL_USERINFO.test(comment ? line : entry.value);
}
function stripSignInLines(fileName, text) {
  const base = lower(baseOf(fileName));
  if (!REGISTRY_CONFIG_FILES.has(base)) return { text, removed: 0 };
  if (base === ".yarnrc.yml") {
    const stripped = stripYarnYaml(text);
    return { text: stripped.text, removed: stripped.removed, ...stripped.held ? { held: true } : {} };
  }
  const lines = text.split(/(?<=\n|\r(?!\n))/u);
  const kept = lines.filter((line) => !signsIn(fileName, line.replace(/\r?\n$|\r$/u, "")));
  return { text: kept.join(""), removed: lines.length - kept.length };
}
var SECRET_PATTERNS = SECRET_LITERALS.filter((literal) => literal.capture).map((literal) => ({ kind: literal.kind, pattern: new RegExp(literal.source, "u") }));
var PUBLIC_GOOGLE_FILES = new Set(PUBLIC_GOOGLE_KEY_FILES);
var FIREBASE_WEB = new RegExp(FIREBASE_WEB_CONFIG, "u");
function publicGoogleKey(path, text) {
  return path !== void 0 && PUBLIC_GOOGLE_FILES.has(lower(baseOf(path))) || FIREBASE_WEB.test(text);
}
var COMPOSER_AUTH_SECTIONS = ["http-basic", "bearer", "github-oauth", "gitlab-oauth", "gitlab-token", "bitbucket-oauth"];
var COMPOSER_AUTH = new RegExp(`"(?:${COMPOSER_AUTH_SECTIONS.join("|")})"\\s*:\\s*\\{\\s*"`, "u");
function sniffSecrets(text, path) {
  const found = SECRET_PATTERNS.filter(({ kind, pattern }) => pattern.test(text) && !(kind === "google_api_key" && publicGoogleKey(path, text))).map(({ kind }) => kind);
  if (path !== void 0 && lower(baseOf(path)) === "auth.json" && COMPOSER_AUTH.test(text)) found.push("composer_auth");
  return found;
}

// ../components/convex/workspace/repoScout/upload/limits.ts
var KiB = 1024;
var MiB = 1024 * KiB;
var MB = 1e6;
var GB = 1e9;
var MINUTE_MS = 6e4;
var HOUR_MS = 60 * MINUTE_MS;
var UPLOAD_LIMITS = {
  // ── What one revision may hold ──
  /** A file over this is left out and named in the disclosure; it never blocks the upload. */
  fileBytes: 50 * MB,
  /** Files in one revision (the manifest's entries). */
  revisionFiles: 25e3,
  /** Above this, Configure suggests uploading only what the app needs. */
  revisionWarnFiles: 1e4,
  /** Raw bytes in one revision. */
  revisionBytes: 500 * MB,
  // ── The browser walk ──
  /**
   * Entries (files and folders) the walk visits before it stops and marks the tree truncated. A runaway bound on time,
   * not a memory one: measured 11-05 in Chromium, 100,000 entries kept held about 11 MB of the walk's heap and took 5-9 s
   * of the walk's own work, but a cold disk reads about 250 entries a second (nearly 7 minutes), and a home folder or a
   * whole disk would read for hours. An upload holds at most `revisionFiles`, so an app's own folder is far below it. The
   * page says "very large" from `revisionFiles` entries on and, at this cap with no app found, ends with "too large to
   * read here" and its ways on (local/controller.ts READING_LARGE_ENTRIES, local/engine.ts detect).
   */
  walkEntries: 1e5,
  walkDepth: 64,
  /** Workspace members' package.json files the closure reads; the rest are flagged unknown. */
  closureMembersRead: 5e3,
  /** At or above this share of the folder's files, the whole folder is the default scope. */
  wholeFolderShare: 0.8,
  // ── Paths ──
  pathBytes: 1024,
  segmentBytes: 255,
  pathDepth: 64,
  // ── Hashing and sniffing in the browser ──
  /** Hashing workers: min(hashLanes, hardwareConcurrency - 1), at least 1. */
  hashLanes: 4,
  /** Files in flight per hashing worker. */
  hashInFlight: 2,
  /** Files over this hash one at a time (WebCrypto digest is one-shot: the whole file is in memory). */
  hashSoloBytes: 8 * MiB,
  /** Text files up to this size are sniffed for secrets. */
  sniffBytes: 2 * MiB,
  // ── Packs (docs §5.4) ──
  packEncodedBytes: 8 * MiB,
  packMembers: 1e3,
  packHeaderBytes: 256 * KiB,
  /** A file over this many raw bytes goes alone in its own pack. */
  packSoloRawBytes: 1 * MiB,
  /** A member whose gzip saves less than this share is stored as `identity`. */
  gzipMinSaving: 0.1,
  /** Pack uploads in flight from the browser; pack downloads in flight in the sandbox. */
  uploadConcurrency: 4,
  sandboxFetchConcurrency: 8,
  // ── Calls ──
  /** Hashes per `sourceUploads.missing` call; members per `landed` call; hashes per `resolve` call. */
  missingBatch: 1e3,
  landedBatch: 1e3,
  resolveBatch: 1e3,
  /** The commit body (the gzip'd client manifest). */
  commitManifestEncodedBytes: 8 * MiB,
  /** `sourceUploadRevisions.commits` and `.sufficiency.missingDirs` stay bounded. */
  revisionCommits: 20,
  missingDirs: 20,
  /** `sourceUploads.extraDirs`: the folders updates keep taking. */
  extraDirs: 40,
  // ── The server scan (same caps as the GitHub scan, so the two agree) ──
  scanBlobBytes: 1 * MiB,
  scanLockfileBytes: 8 * MiB,
  scanManifestPaths: 240,
  // ── Quotas ──
  teamStoredBytes: 5 * GB,
  teamLiveSources: 20,
  teamDailyBytes: 5 * GB,
  teamOpenSessions: 3,
  userOpenSessions: 2,
  userDailySessions: 30,
  /** A person's own uploads before they belong to a workspace (no team yet), and anyone's uploads a day. */
  userStoredBytes: 5 * GB,
  userDailyBytes: 5 * GB,
  /** Requests per minute per token at the edge (a brake, not the quota). */
  tokenRequestsPerMinute: 600,
  // ── Lifetimes ──
  uploadTokenMs: HOUR_MS,
  readTokenMs: 15 * MINUTE_MS,
  sessionIdleMs: 24 * HOUR_MS,
  /** An `open` source with no project and no open session is purged after this. */
  openSourceMs: 24 * HOUR_MS,
  /** Revisions kept per attached source, besides any a saved version or a live sandbox still holds. */
  keepRevisions: 5,
  /** How long the worker may cache Convex's "this revision is readable" answer for pack reads. */
  readableCacheMs: MINUTE_MS,
  // ── "Update from folder" reaching the Design library (docs §8.5) ──
  /** A Library that is busy is asked again this often at first, this many times in all (the first hour).. */
  updateRetryMs: 10 * MINUTE_MS,
  updateFastAttempts: 6,
  /** ..then once an hour, up to this many attempts in all (a day), so a long-running thread only delays an update. */
  updateSlowRetryMs: HOUR_MS,
  updateAttempts: 29,
  /** A revision whose server check has not answered yet (it answers in seconds: mirel's took 7 s, 11-06) is asked
   *  again this often, this many times (five minutes), before it waits like a busy Library. On 11-06 the update's
   *  first try came before the check and the next one ten minutes later, so the Library took 10 min to start. */
  updateCheckRetryMs: 15e3,
  updateCheckAttempts: 20,
  /** A committed update counts as on its way for this long. After it, the project may be updated again (the next
   *  upload supersedes one that never landed), so no project is left unable to update. */
  updateLandingMs: 26 * HOUR_MS,
  // ── Labels ──
  labelChars: 100
};

// ../components/convex/workspace/repoScout/upload/heldBack.ts
var BINARY_SNIFF_BYTES = 8e3;
function scanTextOf(bytes) {
  const sniff = bytes.subarray(0, BINARY_SNIFF_BYTES);
  for (let index = 0; index < sniff.length; index++) if (sniff[index] === 0) return null;
  try {
    return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  } catch {
    return null;
  }
}
var baseOf2 = (path) => path.slice(path.lastIndexOf("/") + 1);
function uploadBytesOf(path, bytes) {
  if (!REGISTRY_CONFIG_FILES.has(baseOf2(path).toLowerCase())) return { bytes, signInLines: 0 };
  const stripped = stripSignInLines(path, new TextDecoder("utf-8").decode(bytes));
  if (!stripped.removed) return { bytes, signInLines: 0 };
  return { bytes: new TextEncoder().encode(stripped.text), signInLines: stripped.removed, ...stripped.held ? { held: true } : {} };
}
function heldBackOf(path, raw) {
  const { bytes, signInLines, held } = uploadBytesOf(path, raw);
  let secrets = [];
  if (bytes.length <= UPLOAD_LIMITS.sniffBytes) {
    const text = scanTextOf(bytes);
    if (text !== null) secrets = sniffSecrets(text, path);
  }
  if (held) secrets = [...secrets, "registry_sign_in"];
  return { secrets, bytes, signInLines: held ? 0 : signInLines };
}

// src/push.ts
var DEFAULT_PUSH_URL = "https://festive-owl-43.convex.site";
var EXIT = { ok: 0, failed: 1, refused: 2 };
var PUSH_HELP = `
Push one commit's code into a Dessn Library (docs/library-push/CONTRACT.md). The first push of a
name sets the Library up; each later push updates it; the same commit again changes nothing.

What goes: the git tree of --commit (never uncommitted changes), less what Dessn's folder upload
leaves out: .git, installed packages, build output and caches, secret files (.env*, keys,
credentials) and any file with a password or key in it (named on stderr, kept on this machine).

Exit codes:
  0  started (setting_up or updating) or unchanged (this commit was pushed before)
  2  refused, and it stays refused until something is set differently: a bad or revoked key, no
     "Library push" scope, a key for several teams, Library push off for the account, a name that
     is a GitHub Library, a bad argument, code too large: the message and the fix go to stderr
  1  anything else, retryable: 429 or 5xx (asked again 3 times first, waiting what Retry-After
     says), the network, not a git checkout, no such commit. Running it again is safe: a push is
     idempotent on the commit

Environment: DESSN_TOKEN (the key, when --token is not given), DESSN_PUSH_URL (Dessn's push
endpoint, default ${DEFAULT_PUSH_URL}). In GitHub Actions the branch defaults to GITHUB_REF_NAME.

Examples:
  DESSN_TOKEN=dsk_\u2026 npx @dessn-ai/mcp-cli push
  dessn push --dir apps/web --library web --repo git.example.com/org/monorepo --json
`;
var PushError = class extends Error {
  constructor(message, exitCode, fix, code) {
    super(message);
    this.exitCode = exitCode;
    this.fix = fix;
    this.code = code;
  }
};
function git(cwd, args) {
  return new Promise((resolvePromise, reject) => {
    const child = (0, import_node_child_process.spawn)("git", args, { cwd, stdio: ["ignore", "pipe", "pipe"] });
    const out = [];
    const err = [];
    child.stdout.on("data", (chunk) => out.push(chunk));
    child.stderr.on("data", (chunk) => err.push(chunk));
    child.on("error", (error) => reject(new PushError(`git could not run (${error.message}). Install git.`, EXIT.failed)));
    child.on("close", (code) => {
      if (code === 0) resolvePromise(Buffer.concat(out).toString("utf8"));
      else reject(new PushError(`git ${args[0]} failed: ${Buffer.concat(err).toString("utf8").trim().split("\n")[0] ?? ""}`, EXIT.failed));
    });
  });
}
var BlobReader = class {
  child;
  buffer = Buffer.alloc(0);
  waiting = null;
  ended = false;
  constructor(cwd) {
    this.child = (0, import_node_child_process.spawn)("git", ["cat-file", "--batch"], { cwd, stdio: ["pipe", "pipe", "ignore"] });
    this.child.stdout.on("data", (chunk) => {
      this.buffer = Buffer.concat([this.buffer, chunk]);
      this.waiting?.();
    });
    this.child.stdout.on("end", () => {
      this.ended = true;
      this.waiting?.();
    });
  }
  async need(test) {
    while (!test()) {
      if (this.ended) throw new PushError("git cat-file ended early.", EXIT.failed);
      await new Promise((resolvePromise) => {
        this.waiting = resolvePromise;
      });
      this.waiting = null;
    }
  }
  async read(oid) {
    this.child.stdin.write(`${oid}
`);
    await this.need(() => this.buffer.includes(10));
    const newline = this.buffer.indexOf(10);
    const header = this.buffer.subarray(0, newline).toString("utf8");
    const size = Number(header.split(" ")[2]);
    if (!Number.isSafeInteger(size)) throw new PushError(`git could not read ${oid}.`, EXIT.failed);
    await this.need(() => this.buffer.length >= newline + 1 + size + 1);
    const bytes = new Uint8Array(this.buffer.subarray(newline + 1, newline + 1 + size));
    this.buffer = this.buffer.subarray(newline + 1 + size + 1);
    return bytes;
  }
  close() {
    this.child.stdin.end();
  }
};
function repoOf(raw) {
  if (!raw) return null;
  const text = raw.trim();
  const clean = (host, path) => {
    const h = host.toLowerCase().replace(/^[^@]*@/u, "");
    const p = path.replace(/^\/+|\/+$/gu, "").replace(/\.git$/u, "");
    return h && p ? { host: h, path: p } : null;
  };
  if (/^[a-z][a-z0-9+.-]*:\/\//iu.test(text)) {
    try {
      const url = new URL(text);
      return clean(url.port ? `${url.hostname}:${url.port}` : url.hostname, url.pathname);
    } catch {
      return null;
    }
  }
  const scp = /^(?:[^@/\s]+@)?([^:/\s]+):(.+)$/u.exec(text);
  if (scp) return clean(scp[1], scp[2]);
  const slash = text.indexOf("/");
  return slash > 0 ? clean(text.slice(0, slash), text.slice(slash + 1)) : null;
}
var encoder = new TextEncoder();
function tarHeader(name, size, type, mode) {
  const block = new Uint8Array(512);
  const text = (offset, length, value) => block.set(encoder.encode(value).subarray(0, length), offset);
  const octal = (offset, length, value) => text(offset, length - 1, value.toString(8).padStart(length - 1, "0"));
  text(0, 100, name);
  octal(100, 8, mode);
  octal(108, 8, 0);
  octal(116, 8, 0);
  octal(124, 12, size);
  octal(136, 12, 0);
  block.fill(32, 148, 156);
  block[156] = type.charCodeAt(0);
  text(257, 6, "ustar");
  text(263, 2, "00");
  let sum = 0;
  for (const byte of block) sum += byte;
  text(148, 7, `${sum.toString(8).padStart(6, "0")}\0`);
  return block;
}
var pad = (size) => new Uint8Array((512 - size % 512) % 512);
function* tarEntry(path, bytes, executable) {
  if (encoder.encode(path).length > 100) {
    const body = ` path=${path}
`;
    const length = encoder.encode(body).length;
    let digits = 1;
    while (String(length + digits).length !== digits) digits++;
    const record = encoder.encode(`${length + digits}${body}`);
    yield tarHeader("PaxHeader", record.length, "x", 420);
    yield record;
    yield pad(record.length);
  }
  yield tarHeader(path.slice(0, 100), bytes.length, "0", executable ? 493 : 420);
  yield bytes;
  yield pad(bytes.length);
}
async function packCommit(top, sha, prefix, outDir) {
  const listing = await git(top, ["ls-tree", "-r", "-z", "--full-tree", "-l", sha, ...prefix ? ["--", prefix] : []]);
  const file = (0, import_node_path.join)(outDir, "push.tgz");
  const gzip = (0, import_node_zlib.createGzip)({ level: 6 });
  const out = (0, import_node_fs.createWriteStream)(file);
  const hash = (0, import_node_crypto.createHash)("sha256");
  let size = 0;
  gzip.on("data", (chunk) => {
    hash.update(chunk);
    size += chunk.length;
  });
  gzip.pipe(out);
  const done = new Promise((resolvePromise, reject) => {
    out.on("finish", resolvePromise);
    out.on("error", reject);
    gzip.on("error", reject);
  });
  const write = async (bytes) => {
    if (!gzip.write(bytes)) await new Promise((r) => gzip.once("drain", () => r()));
  };
  const blobs = new BlobReader(top);
  const heldBack = [];
  const tooBig = [];
  let files = 0;
  let rawBytes = 0;
  try {
    for (const record of listing.split("\0")) {
      if (!record) continue;
      const tab = record.indexOf("	");
      const [mode, type, oid, blobSize] = record.slice(0, tab).split(/\s+/u);
      const full = record.slice(tab + 1);
      if (type !== "blob" || mode === "120000" || !oid) continue;
      const path = prefix ? full.slice(prefix.length + 1) : full;
      if (!path || excludedPath(path, { governedByGitignore: () => true })) continue;
      if (Number(blobSize) > UPLOAD_LIMITS.fileBytes) {
        tooBig.push(path);
        continue;
      }
      const raw = await blobs.read(oid);
      const held = heldBackOf(path, raw);
      if (held.secrets.length) {
        heldBack.push(path);
        continue;
      }
      for (const part of tarEntry(path, held.bytes, mode === "100755")) await write(part);
      files += 1;
      rawBytes += held.bytes.length;
    }
  } finally {
    blobs.close();
  }
  await write(new Uint8Array(1024));
  gzip.end();
  await done;
  return { file, size, sha256: hash.digest("hex"), files, rawBytes, heldBack, tooBig };
}
var SETTLED_REFUSALS = /* @__PURE__ */ new Set([
  "UNAUTHENTICATED",
  "SCOPE_REQUIRED",
  "KEY_NOT_ONE_TEAM",
  "LIBRARY_PUSH_OFF",
  "WRITER_REQUIRED",
  "UPLOAD_NOT_ENABLED",
  "PAID_REQUIRED",
  "LIBRARY_NOT_PUSHABLE",
  "LIBRARY_REMOVED",
  "INVALID_ARGUMENT",
  "TOO_LARGE",
  "NOTHING_TO_PUSH"
]);
var RETRIES = 3;
var RETRY_WAIT_MAX_MS = 12e4;
function retryAfterMs(response, attempt) {
  const header = response.headers.get("retry-after");
  const seconds = header && /^\d+$/u.test(header.trim()) ? Number(header) : header ? (Date.parse(header) - Date.now()) / 1e3 : NaN;
  const ms = Number.isFinite(seconds) && seconds > 0 ? seconds * 1e3 : 2e3 * 2 ** attempt;
  return Math.min(ms, RETRY_WAIT_MAX_MS);
}
async function call(url, init) {
  for (let attempt = 0; ; attempt++) {
    let response;
    try {
      response = await fetch(url, {
        method: init.method,
        headers: { authorization: `Bearer ${init.token}`, ...init.body !== void 0 ? { "content-type": "application/json" } : {}, "user-agent": "dessn-push" },
        ...init.body !== void 0 ? { body: JSON.stringify(init.body) } : {},
        signal: AbortSignal.timeout(6e4)
      });
    } catch (error) {
      if (attempt < RETRIES) {
        await new Promise((r) => setTimeout(r, 2e3 * 2 ** attempt));
        continue;
      }
      throw new PushError(`Dessn could not be reached (${error instanceof Error ? error.message : String(error)}).`, EXIT.failed, "Check outbound HTTPS to Dessn, then run it again.", "NETWORK");
    }
    const body = await response.json().catch(() => ({}));
    if (response.ok) return { status: response.status, body };
    const code = typeof body.error === "string" ? body.error : `HTTP_${response.status}`;
    const message = typeof body.message === "string" ? body.message : `Dessn answered ${response.status}.`;
    const fix = typeof body.fix === "string" ? body.fix : void 0;
    if (response.status === 429 || response.status >= 500) {
      if (attempt < RETRIES) {
        const wait = retryAfterMs(response, attempt);
        process.stderr.write(`Dessn answered ${response.status} (${code}); asking again in ${Math.round(wait / 1e3)} s\u2026
`);
        await new Promise((r) => setTimeout(r, wait));
        continue;
      }
      throw new PushError(message, EXIT.failed, fix ?? "Run it again later: a push is idempotent on the commit.", code);
    }
    throw new PushError(message, SETTLED_REFUSALS.has(code) || response.status === 401 || response.status === 403 ? EXIT.refused : EXIT.failed, fix, code);
  }
}
function putFile(url, file, size) {
  return new Promise((resolvePromise, reject) => {
    const target = new URL(url);
    const send = target.protocol === "http:" ? import_node_http.request : import_node_https.request;
    const request = send(target, { method: "PUT", headers: { "content-length": String(size) } }, (response) => {
      const chunks = [];
      response.on("data", (chunk) => chunks.push(chunk));
      response.on("end", () => {
        if ((response.statusCode ?? 0) >= 200 && (response.statusCode ?? 0) < 300) resolvePromise();
        else reject(new PushError(`The upload was refused (${response.statusCode}).`, EXIT.failed, "Run it again (the link lasts 5 minutes)."));
      });
    });
    request.on("error", (error) => reject(new PushError(`The upload failed (${error.message}).`, EXIT.failed, "Run it again.")));
    (0, import_node_fs.createReadStream)(file).on("error", reject).pipe(request);
  });
}
var say = (json, line) => {
  if (!json) process.stderr.write(`${line}
`);
};
async function runPush(options) {
  const dir = (0, import_node_path.resolve)(options.dir ?? ".");
  const top = (await git(dir, ["rev-parse", "--show-toplevel"]).catch(() => {
    throw new PushError(`${dir} is not inside a git checkout.`, EXIT.failed, "Run it in a clone, or pass --dir <clone>.");
  })).trim();
  const prefix = (0, import_node_path.relative)(top, dir).split("\\").join("/");
  if (prefix.startsWith("..")) throw new PushError(`${dir} is outside its checkout.`, EXIT.failed);
  const sha = (await git(top, ["rev-parse", "--verify", `${options.commit ?? "HEAD"}^{commit}`]).catch(() => {
    throw new PushError(`No commit ${options.commit ?? "HEAD"} in ${top}.`, EXIT.failed, "Pass --commit <sha> of a commit in this clone (a shallow CI clone has only the commit it checked out).");
  })).trim();
  let branch = options.branch;
  if (!branch) {
    const current = (await git(top, ["rev-parse", "--abbrev-ref", "HEAD"]).catch(() => "HEAD")).trim();
    branch = current !== "HEAD" ? current : process.env.GITHUB_REF_NAME || process.env.CI_COMMIT_REF_NAME || "main";
  }
  const message = (await git(top, ["log", "-1", "--format=%B", sha]).catch(() => "")).trim().slice(0, 2e3);
  const author = (await git(top, ["log", "-1", "--format=%an", sha]).catch(() => "")).trim().slice(0, 200);
  const remote = (await git(top, ["remote", "get-url", "origin"]).catch(() => "")).trim();
  const repo = repoOf(options.repo) ?? repoOf(remote);
  if (options.repo && !repoOf(options.repo)) throw new PushError(`--repo ${options.repo} is not host/path.`, EXIT.failed, "Pass it as git.example.com/org/repo.");
  const library = (options.library ?? (prefix ? (0, import_node_path.basename)(prefix) : repo ? repo.path.split("/").pop() : (0, import_node_path.basename)(top)) ?? (0, import_node_path.basename)(top)).trim();
  if (!library) throw new PushError("No Library name.", EXIT.failed, "Pass --library <name>.");
  const token = options.token ?? process.env.DESSN_TOKEN;
  if (!options.dryRun && !token) throw new PushError("No Dessn API key.", EXIT.refused, 'Pass --token dsk_\u2026 or set DESSN_TOKEN (Settings \u203A MCP \u203A Create API key, with "Library push").', "UNAUTHENTICATED");
  const base = (options.url ?? process.env.DESSN_PUSH_URL ?? DEFAULT_PUSH_URL).replace(/\/+$/u, "");
  const work = (0, import_node_fs.mkdtempSync)((0, import_node_path.join)((0, import_node_os.tmpdir)(), "dessn-push-"));
  try {
    say(options.json, `Packing ${library} at ${sha.slice(0, 12)} (${branch})${prefix ? ` from ${prefix}/` : ""}\u2026`);
    const packed = await packCommit(top, sha, prefix, work);
    if (packed.heldBack.length) say(options.json, `Held back ${packed.heldBack.length} file(s) with a password or key in them (kept here): ${packed.heldBack.slice(0, 20).join(", ")}${packed.heldBack.length > 20 ? ", \u2026" : ""}`);
    if (packed.tooBig.length) say(options.json, `Left out ${packed.tooBig.length} file(s) over ${UPLOAD_LIMITS.fileBytes / 1e6} MB: ${packed.tooBig.slice(0, 10).join(", ")}`);
    say(options.json, `${packed.files} files, ${(packed.rawBytes / 1e6).toFixed(1)} MB (${(packed.size / 1e6).toFixed(1)} MB packed).`);
    if (packed.files === 0) throw new PushError("Nothing to push: the commit holds no files Dessn takes.", EXIT.refused, "Push a commit with the app's code in it.", "NOTHING_TO_PUSH");
    if (options.dryRun) {
      const answer2 = { dryRun: true, library, commit: sha, branch, repo, files: packed.files, rawBytes: packed.rawBytes, archive: { size: packed.size, sha256: packed.sha256 }, heldBack: packed.heldBack };
      if (options.json) process.stdout.write(`${JSON.stringify(answer2)}
`);
      return { exitCode: EXIT.ok, answer: answer2 };
    }
    const started = await call(`${base}/library/push/start`, {
      method: "POST",
      token,
      body: {
        library,
        ...repo ? { repo } : {},
        commit: { sha, branch, message, ...author ? { author } : {} },
        archive: { size: packed.size, sha256: packed.sha256, format: "tar.gz" },
        source: options.source && ["cli", "action", "bridge"].includes(options.source) ? options.source : process.env.GITHUB_ACTIONS === "true" ? "action" : "cli"
      }
    });
    const pushId = String(started.body.pushId ?? "");
    const uploadUrl = String(started.body.uploadUrl ?? "");
    if (!pushId || !uploadUrl) throw new PushError("Dessn answered start without an upload link.", EXIT.failed, "Run it again.");
    say(options.json, `Uploading to team ${started.body.team?.slug ?? "?"}\u2026`);
    await putFile(uploadUrl, packed.file, packed.size);
    const finished = await call(`${base}/library/push/finish`, { method: "POST", token, body: { pushId } });
    const answer = { pushId, ...finished.body };
    if (options.json) process.stdout.write(`${JSON.stringify(answer)}
`);
    else {
      const status = String(finished.body.status ?? "");
      const words = status === "setting_up" ? "Setting up the Library from this commit (a first setup takes a while)." : status === "updating" ? "Updating the Library to this commit." : status === "unchanged" ? "Unchanged: this commit was pushed to this Library before." : status;
      process.stdout.write(`${words}
Library: ${String(finished.body.libraryUrl ?? "")}
Status:  ${String(finished.body.statusUrl ?? "")}
`);
    }
    return { exitCode: EXIT.ok, answer };
  } finally {
    (0, import_node_fs.rmSync)(work, { recursive: true, force: true });
  }
}
function reportPushFailure(error, json) {
  const failure = error instanceof PushError ? error : new PushError(error instanceof Error ? error.message : String(error), EXIT.failed);
  if (json) process.stdout.write(`${JSON.stringify({ error: failure.code ?? (failure.exitCode === EXIT.refused ? "REFUSED" : "FAILED"), message: failure.message, ...failure.fix ? { fix: failure.fix } : {} })}
`);
  process.stderr.write(`dessn push: ${failure.code ? `${failure.code}: ` : ""}${failure.message}${failure.fix ? `
  fix: ${failure.fix}` : ""}
`);
  return failure;
}
function createPushCommand(program2) {
  return program2.command("push").description("Push a commit's code into a Dessn Library (sets it up, then keeps it updated)").option("--dir <dir>", "The git checkout, or a folder in it to push alone (default: .)").option("--library <name>", "The Library's name on the key's team (default: the repository's name)").option("--token <key>", 'A Dessn API key with "Library push" (default: $DESSN_TOKEN)').option("--commit <sha>", "The commit to push (default: HEAD)").option("--branch <branch>", "Its branch (default: the current branch, else $GITHUB_REF_NAME)").option("--repo <host/path>", "Where the code lives, e.g. git.example.com/org/repo (default: the origin remote)").option("--url <url>", `Dessn's push endpoint (default: $DESSN_PUSH_URL, else ${DEFAULT_PUSH_URL})`).option("--source <source>", "Who pushes: cli, action or bridge (default: action in GitHub Actions, else cli)").option("--json", "Print the finish answer as one JSON line on stdout").option("--dry-run", "Pack and say what would go; upload nothing").addHelpText("after", PUSH_HELP).action(async (options) => {
    try {
      const { exitCode } = await runPush(options);
      process.exitCode = exitCode;
    } catch (error) {
      process.exitCode = reportPushFailure(error, options.json).exitCode;
    }
  });
}

// src/action.ts
var VERSION = true ? "0.1.5" : "0.0.0";
var input = (name) => (process.env[`INPUT_${name.replace(/ /gu, "_").toUpperCase()}`] ?? "").trim();
async function runAsAction() {
  const token = input("token");
  if (token) process.stdout.write(`::add-mask::${token}
`);
  const server = (process.env.GITHUB_SERVER_URL ?? "https://github.com").replace(/^https?:\/\//u, "").replace(/\/+$/u, "");
  const repository = process.env.GITHUB_REPOSITORY;
  process.stderr.write(`dessn push ${VERSION} (GitHub Action)
`);
  try {
    const { exitCode, answer } = await runPush({
      dir: input("dir") || ".",
      library: input("library") || void 0,
      token: token || void 0,
      commit: process.env.GITHUB_SHA || void 0,
      repo: input("repo") || (repository ? `${server}/${repository}` : void 0),
      url: input("url") || void 0,
      source: "action"
    });
    if (answer) {
      const status = String(answer.status ?? "");
      const libraryUrl = String(answer.libraryUrl ?? "");
      if (process.env.GITHUB_OUTPUT) (0, import_node_fs2.appendFileSync)(process.env.GITHUB_OUTPUT, `status=${status}
library-url=${libraryUrl}
status-url=${String(answer.statusUrl ?? "")}
push-id=${String(answer.pushId ?? "")}
`);
      if (process.env.GITHUB_STEP_SUMMARY) (0, import_node_fs2.appendFileSync)(process.env.GITHUB_STEP_SUMMARY, `Dessn Library push: **${status}**: ${libraryUrl}
`);
    }
    return exitCode;
  } catch (error) {
    const failure = reportPushFailure(error);
    process.stdout.write(`::error title=Dessn Library push::${failure.message.replace(/\r?\n/gu, " ")}${failure.fix ? ` Fix: ${failure.fix.replace(/\r?\n/gu, " ")}` : ""}
`);
    return failure.exitCode;
  }
}
if (process.argv.length <= 2 && process.env.GITHUB_ACTIONS === "true") {
  runAsAction().then((code) => {
    process.exitCode = code;
  });
} else {
  const program2 = new Command();
  program2.name("dessn").description("dessn push: a commit's code into a Dessn Library").version(VERSION, "-v, --version", "Display version");
  createPushCommand(program2);
  program2.showHelpAfterError();
  program2.parseAsync(process.argv).catch((error) => {
    console.error(`Fatal error: ${error instanceof Error ? error.message : String(error)}`);
    process.exit(1);
  });
}

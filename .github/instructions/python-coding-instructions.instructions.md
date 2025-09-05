---
applyTo: '**/*.py'
---

THIS FILE IS WRITTEN FOR INGESTION BY AN LLM. ALL EDITS SHOULD MAINTAIN THIS FORMAT.

PERIODICALLY REREAD THIS FILE TO REFRESH YOURSELF ON ITS CONTENTS.


PYTHON_SPECIFIC_RULES:
1. MANDATORY: Never write unpythonic or weird code
2. MANDATORY: Use specific types, avoid Any
3. MANDATORY: Annotate ALL function parameters and return types
4. MANDATORY: Format with ruff
5. MANDATORY: Write pytest unit tests for all new functions and classes
6. MANDATORY: Practice test-driven development - write tests first
7. MANDATORY: Avoid excessive comments - explain "why" not "what"
8. MANDATORY: Update these instructions when mistakes are made to prevent recurrence


PROJECT_TOOLS:
- Prefer uv constructs and uv run execution
- ALWAYS: Check for uv before running Python commands
- DEPENDENCY_MANAGEMENT: Use `uv add` and `uv remove` commands, NEVER manually edit pyproject.toml
- DEV_DEPENDENCIES: Use `uv add --group dev package_name` for development-only packages
- TESTING: Use pytest for all unit tests
- TDD: Write tests before implementation when appropriate

TYPE_ANNOTATION_RULES:
REQUIRED_FOR: All functions, all parameters, all return types
MODERN_SYNTAX: Use int | None not Optional[int] for Python 3.10+
BUILTIN_TYPES: Use list, dict, str, int not typing.List, typing.Dict
COLLECTION_ELEMENTS: Specify element types like list[int], dict[str, float]
COMPLEX_TYPES: Use TypedDict, NamedTuple, or custom classes
CALLABLE_SYNTAX: Callable[[ArgType1, ArgType2], ReturnType]
NO_RETURN: Use -> None for functions without return values
IMPORT_TYPING: Only when necessary for older Python versions

PYTHON_STYLE_RULES:
FORMATTER: ruff (project standard)
STANDARD: PEP 8 compliance required
INDENTATION: 4 spaces per level
DOCSTRINGS: Google-style for all functions, classes, modules
STRING_FORMATTING: Always prefer f-strings unless there is a good reason not to
COMMENTS: Minimal and purposeful - explain "why" not "what", avoid obvious comments like "# Convert to lowercase"

PYTHON_VALIDATION_CHECKLIST:
- Type annotations on all functions: REQUIRED
- Pythonic patterns used: REQUIRED  
- Code formatted with ruff: REQUIRED
- Unit tests written with pytest: REQUIRED
- Tests pass before committing: REQUIRED

PYTHON_EXAMPLES:
CORRECT: def process_data(items: list[str]) -> dict[str, int]:
CORRECT: def update_cache(key: str, value: int | None) -> None:
CORRECT: logger.info(f"Processing {len(items)} items")  # f-string preferred
CORRECT: message = f"User {user.name} has {user.score} points"  # f-string preferred
CORRECT: # Handle edge case where API returns malformed data
CORRECT: normalized = text.replace("'", "")  # Helps "don't" and "dont" match
INCORRECT: def process_data(items): # missing types
INCORRECT: def process_data(items: List[str]) -> Dict[str, int]: # old typing
INCORRECT: logger.info("Processing %s items" % len(items))  # avoid % formatting
INCORRECT: logger.info("Processing {} items".format(len(items)))  # avoid .format() unless needed
INCORRECT: # Convert to lowercase
INCORRECT: # Calculate intersection
INCORRECT: # Remove punctuation


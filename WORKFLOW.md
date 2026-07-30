Settings Form: Lazy and Precise Prompting

Prompt 1:
“a-vague-prompt1”: single-sentence prompt with zero context:"Create a settings form with validation.".
Fresh session, agent mode, output accepted without review. 
Time for generation and building is 3 min.

Prompt 2:
“a-precise-prompt2”: prompt with explicit file paths, technical constraints, field-by-field spec, accessibility requirements and a verification step.
Also, a fresh session, plan mode instead of agent mode, plan reviewed before execution. 
Time for generation is 3 min 2 s, time for review is 10min, time for building 1s.


## Correctness

Prompt 1 built an 11-field form across three sections (Profile, Preferences, Security) that were never requested, display name, email, bio, theme, language, timezone, three notification toggles and a full password-change flow with its own validation logic. 

Prompt 2 built exactly the four fields specified: name, email, timezone, newsletter toggles.


## Accessibility

Both prompt 1 and 2 use “error handling” on inputs.
Prompt 1 additionally supports a hint id alongside with error id, while prompt 2 doesn’t have hints but error handling works appropriately.

## Edge cases

Prompt 1 validates and saves new password changes if one of the three inputs are correctly filled (current password, new password, confirm password), so doesn’t require all of them to be filled for saving changes. 

Prompt 2 validates and saves changes only if all inputs are correctly filled.

## Review effort

Prompt 2 felt slower to start (writing the prompt, waiting through Plan Mode,
watching the verification loop) but needed almost no review time afterwards as prompt 2 shipped 4 passing tests that I ran and verified green before committing.

Prompt 1 felt like a faster building but left me with an unexpected 11-field surface, no tests, and one real surface bug to catch by hand. 

So, reviewing prompt 1 by hand will take noticeably more time than reading prompt 2’s test results.

Also, "precise" prompting still needs to cover every dimension explicitly, including ones that feel obvious.

## Styling gap

Prompt 1 shipped a fully styled dark-theme UI for the form validation even though I provide a single lazy vague prompt.


Prompt 2 was precise about logic and validation, but I didn’t mention styling, so it rendered as unstyled HTML.


Lesson: "precise" prompting still needs to cover every dimension explicitly, including ones that feel obvious.

## AI mistake caught

Prompt 1's references section has a real UI bug: when the theme, language or timezone dropdown is opened, the option list renders with text invisible until each option is hovered, so only the hover/highlight state reveals it. This points to the text color too close to the dropdown's background color.

Prompt 2's timezone dropdown has no such issue, every option is visible as soon as it's opened. 
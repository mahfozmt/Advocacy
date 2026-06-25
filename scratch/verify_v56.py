import sys

def check_file(path, expected_strings):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    missing = []
    for s in expected_strings:
        if s not in content:
            missing.append(s)

    if missing:
        print(f"FAILED Verification for {path}. Missing strings:")
        for m in missing:
            print(f"  - {m}")
        sys.exit(1)
    else:
        print(f"PASSED Verification for {path}.")

brief_strings = [
    "This appeal is not about whether SA record can be rebutted",
    "If Misc Case No.1181/1969 is the foundation of the respondents' claim, where is the certified order?",
    "A court cannot presume the contents of a judicial proceeding merely because a later office note refers to it",
    "THE SILENCE OF THE AUTHORITATIVE RECORD",
    "The most reliable witness in this case is not DW-4, but the District Record Room itself",
    "could not even correctly identify the recorded tenant",
    "Respondents cannot simultaneously assert:\n> (i) that SA 238 stood corrected in 1969 and reduced to one dag;\n> and\n> (ii) execute a registered deed in 1975",
    "Both propositions cannot stand together",
    "The Claim of Sonavanu Was Not a Clerical Correction Claim",
    "Sonavanu's case was not that she was omitted from the heirs of Abdul Ali",
    "All incidental questions of title can be decided in partition suit",
    "A new title cannot be created through an unproved Misc Case"
]

summary_strings = [
    "This appeal is not about whether SA record can be rebutted",
    "If Misc Case No.1181/1969 is the foundation of the respondents' claim",
    "A court cannot presume the contents of a judicial proceeding merely because a later office note refers to it",
    "THE SILENCE OF THE AUTHORITATIVE RECORD",
    "The most reliable witness in this case is not DW-4, but the District Record Room itself",
    "could not even correctly identify the recorded tenant",
    "Respondents cannot simultaneously assert (i) that SA 238 stood corrected in 1969",
    "Both propositions cannot stand together",
    "The Claim of Sonavanu Was Not a Clerical Correction Claim",
    "Sonavanu's case was not that she was omitted from the heirs of Abdul Ali",
    "All incidental questions of title can be decided in partition suit",
    "A new title cannot be created through an unproved Misc Case"
]

check_file('Output/appellate_argument_v56_Brief.md', brief_strings)
check_file('Output/appellate_argument_v56_Summary.md', summary_strings)

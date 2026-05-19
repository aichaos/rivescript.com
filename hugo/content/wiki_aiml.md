+++
date = '2026-05-19T13:40:10-07:00'
draft = false
title = 'Language/AIML'
url = '/wiki/Language/AIML'
+++
# Language/AIML

AIML stands for **A**rtificial **I**ntelligence **M**arkup **L**anguage. It's an XML-based language designed by Dr. Richard Wallace in 2001 for development of the [A.L.I.C.E.](https://en.wikipedia.org/wiki/Artificial_Linguistic_Internet_Computer_Entity) chatbot.

## Example

```xml
<aiml version="1.0">

<!-- Basic atomic trigger/response -->
<category>
  <pattern>HELLO BOT</pattern>
  <template>
    Hello, human.
  </template>
</category>

<!-- Wildcard, variable learning, random replies. -->
<category>
  <pattern>MY NAME IS *</pattern>
  <template>
    <think><set name="name"><formal/></set></think>
    <random>
      <li>It's nice to meet you, <get name="name"/>.</li>
      <li>Nice to meet you, <get name="name"/>.</li>
    </random>
  </template>
</category>

<!-- Redirect (alias) one pattern to another. -->
<category>
  <pattern>CALL ME *</pattern>
  <template>
    <srai>MY NAME IS <star index="1"/></srai>
  </template>
</category>

<!-- Conditions -->
<category>
  <pattern>WHAT IS MY NAME</pattern>
  <template>
    <condition name="name">
      <li value="undefined">You never told me your name.</li>
      <li>Your name is <get name="name"/>, seeker!</li>
    </condition>
  </template>
</category>

</aiml>
```

## Comparison with RiveScript

See [RiveScript vs. AIML](/compare/aiml) for the language and syntax differences between RiveScript and AIML.

## See Also

* The A.L.I.C.E. AI Foundation's definition of [AIML](http://www.alicebot.org/aiml.html)
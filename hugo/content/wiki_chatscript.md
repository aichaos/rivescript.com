+++
date = '2026-05-19T13:40:10-07:00'
draft = false
title = 'Language/ChatScript'
url = '/wiki/Language/ChatScript'
+++
# Language/ChatScript

ChatScript is a "next Generation" chatbot engine, based on the one that powered Suzette, that won the 2010 Loebner Competition. ChatScript has many advanced features and capabilities that, when properly utilized, permit extremely clever bots to be programmed. There is also a potentially useful ontology of nouns, verbs, adjectives, and adverbs for understanding meaning.

ChatScript was created by Bruce Wilcox.

## Example

```c
#
# file: food.top
#
topic: ~food []

#! I like spinach
s: ( I like spinach ) Are you a fan of the Popeye cartoons?

	a: ( ~yes )  I used to watch him as a child. Did you lust after Olive Oyl?
    	    b: ( ~no ) Me neither. She was too skinny.
    	    b: ( yes ) You probably like skinny models.

	a: ( ~no ) What cartoons do you watch?
     		b: ( none ) You lead a deprived life.
     		b: ( Mickey Mouse ) The Disney icon.

#! I often eat chicken
u: ( ![ not never rarely ] I * ~ingest * ~meat ) You eat meat.

#! I really love chicken
u: ( !~negativeWords I * ~like * ~meat ) You like meat.

#! do you eat bacon?
?: ( do you eat _ [ ham eggs bacon] ) I eat '_0

#! do you like eggs or sushi?
?: ( do you like _* or _* ) I don't like '_0 so I guess that means I prefer '_1.

#! I adore kiwi.
s: ( ~like ~fruit ![~animal _bear] )  Vegan, you too...

#! do you eat steak?
?: ( do you eat _~meat ) No, I hate _0.

#! I eat fish.
s: ( I eat _*1 > )
  $food = '_0
  I eat oysters.
```

## See Also

* ChatScript's homepage: http://chatscript.sourceforge.net/
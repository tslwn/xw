DO $$DECLARE env TEXT := '${env}';
BEGIN
  IF env IN ('development', 'test') THEN
    TRUNCATE api.clue;

    -- https://www.theguardian.com/crosswords/prize/28458
    INSERT INTO api.clue (answer, clue, notes) VALUES (
      'carroty',
      'Orange books in lift',
      'CARR<O(ld)/T(estament)>Y'
    );
    INSERT INTO api.clue (answer, clue, notes) VALUES (
      'dullard',
      'Everything flipping right in lemon fool',
      'DU<ALL(rev)/R(ight)>D'
    );
    INSERT INTO api.clue (answer, clue, notes) VALUES (
      'gala',
      'Hybrid melon, one scooped out for party',
      'GAL(i)A'
    );
    INSERT INTO api.clue (answer, clue, notes) VALUES (
      'Beethoven',
      'Mastro placing last bits of crab apple on the new cooker',
      '(cra)B/(appl)E/THE (anag) + OVEN'
    );
    INSERT INTO api.clue (answer, clue, notes) VALUES (
      'spare',
      'Extra strawberries finally cut',
      '(strawberrie)S/PARE'
    );
    INSERT INTO api.clue (answer, clue, notes) VALUES (
      'handsome',
      'Large ripe damson that man has picked',
      'H<DAMSON(anag)>E'
    );
    INSERT INTO api.clue (answer, clue, notes) VALUES (
      'lime',
      'Fruit in slippery gunk, initially wiped',
      '(s)LIME'
    );
    INSERT INTO api.clue (answer, clue, notes) VALUES (
      'ramen',
      'Japanese food: a little clementine marked ''From the East''',
      'clementiNE MARked (hidden rev)'
    );
    INSERT INTO api.clue (answer, clue, notes) VALUES (
      'Byrd',
      'Renaissance composer producing sound of kiwi, say?',
      'bird (hom)'
    );
    INSERT INTO api.clue (answer, clue, notes) VALUES (
      'redeemer',
      'Cherry always cut by me for saviour',
      'RED/EE<ME>R'
    );
    INSERT INTO api.clue (answer, clue, notes) VALUES (
      'beaut',
      'Yet to consume each peach',
      'B<EA(ch)>UT'
    );
    INSERT INTO api.clue (answer, clue, notes) VALUES (
      'entangled',
      'Confused flavour, lychee lacking pulp in conclusion',
      'EN<TANG/L(yche)E>D'
    );
    INSERT INTO api.clue (answer, clue, notes) VALUES (
      'rude',
      'Some of the durian rejected — like a raspberry?',
      'thE DURian (hidden rev)'
    );
    INSERT INTO api.clue (answer, clue, notes) VALUES (
      'apricot',
      'A jar containing mostly mellow fruit',
      'A/P<RIC(h)>OT'
    );
    INSERT INTO api.clue (answer, clue, notes) VALUES (
      'choc ice',
      'Sweet plum filled with cream, originally',
      'CHO<C(ream)>ICE'
    );
    INSERT INTO api.clue (answer, clue, notes) VALUES (
      'papa',
      'Father requiring pair of pears, oddly',
      'PAPA(ya)'
    );
    INSERT INTO api.clue (answer, clue, notes) VALUES (
      'great ape',
      'Feast in fruit for large animal',
      'GR<EAT>APE'
    );
    INSERT INTO api.clue (answer, clue, notes) VALUES (
      'stable',
      'Sturdy bill prodding fruit, first of oils extracted',
      'S<TAB>L(o)E'
    );
    INSERT INTO api.clue (answer, clue, notes) VALUES (
      'Buchanan',
      'US president with endless fruit: a good deal to eat, but no starter',
      'B<(m)UCH>ANAN(a)'
    );
    INSERT INTO api.clue (answer, clue, notes) VALUES (
      'olives',
      'Nothing is fruit',
      '0 LIVES'
    );
    INSERT INTO api.clue (answer, clue, notes) VALUES (
      'Iran',
      'Country importing really amaz­ing nectarines, primarily',
      'I(mporting)/R(eally/A(mazing)/N(ectarines)'
    );
    INSERT INTO api.clue (answer, clue, notes) VALUES (
      'ephemeral',
      'Passing hard prune stone, with Pepe''s bowels opening?',
      '(p)EP(e) + H(ard)/EMERAL(d)'
    );
    INSERT INTO api.clue (answer, clue, notes) VALUES (
      'Seine',
      'Date boxes in European river',
      'SE<IN>E'
    );
    INSERT INTO api.clue (answer, clue, notes) VALUES (
      'Marat',
      'David''s subject picking up some fruit, a rambutan',
      'fruiT A RAMbutam (hidden rev)'
    );
    INSERT INTO api.clue (answer, clue, notes) VALUES (
      'Roman god',
      'Staff pressing fruit for Bacchus, say?',
      'RO<MANGO>D'
    );
    INSERT INTO api.clue (answer, clue, notes) VALUES (
      'boat race',
      'Event finding seed in pear, we hear?',
      'OAT in ‘brace’ (hom)'
    );
    INSERT INTO api.clue (answer, clue, notes) VALUES (
      'entail',
      'Involve last of fruit in a line, stewed',
      '(frui)T in A/LINE (anag)'
    );
    INSERT INTO api.clue (answer, clue, notes) VALUES (
      'Buddha',
      'Spiritual teacher with friend had nuts',
      'BUD + HAD (anag)'
    );
    INSERT INTO api.clue (answer, clue, notes) VALUES (
      'espy',
      'See inexpensive fruits, cheap and nasty, ultimately',
      '(inexpensiv)E/(fruit)S/(chea)P/(nast))Y'
    );
    INSERT INTO api.clue (answer, clue, notes) VALUES (
      'duck',
      'Dodge mandarin, for example',
      'double def'
    );
  END IF;
END$$;
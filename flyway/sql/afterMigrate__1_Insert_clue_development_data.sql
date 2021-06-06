DO $$DECLARE env TEXT := '${env}';
BEGIN
  IF env = 'development' AND NOT EXISTS (SELECT * FROM api.clue) THEN
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
  END IF;
END$$;
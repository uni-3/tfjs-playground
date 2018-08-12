export const Nodes = [ 
  { id: "mammal", group: 0, label: "Mammals" , symbolType: 'square', size: 200, color: 'orange'},
  { id: "dog"   , group: 0, label: "Dogs"    , symbolType: 'square', size: 200},
  { id: "cat"   , group: 0, label: "Cats"    , symbolType: 'square', size: 200},
  { id: "fox"   , group: 0, label: "Foxes"   , symbolType: 'square', size: 200}, 
  { id: "elk"   , group: 0, label: "Elk"     , symbolType: 'square', size: 200},
  { id: "insect", group: 1, label: "Insects" },
  { id: "ant"   , group: 1, label: "Ants"    },
  { id: "bee"   , group: 1, label: "Bees"    },  
  { id: "fish"  , group: 2, label: "Fish"    },
  { id: "carp"  , group: 2, label: "Carp"    },
  { id: "pike"  , group: 2, label: "Pikes"   } 
]

export const Links = [
  { target: "mammal", source: "dog" , strength: 0.7 },
  { target: "mammal", source: "cat" , strength: 0.7 },
  { target: "mammal", source: "fox" , strength: 0.7 },
  { target: "mammal", source: "elk" , strength: 0.7 },
  { target: "insect", source: "ant" , strength: 0.7 },
  { target: "insect", source: "bee" , strength: 0.7 },
  { target: "fish"  , source: "carp", strength: 0.7 },
  { target: "fish"  , source: "pike", strength: 0.7 },

  { target: "cat"   , source: "elk" , strength: 0.1 },
  { target: "carp"  , source: "ant" , strength: 0.1 },
  { target: "elk"   , source: "bee" , strength: 0.1 },
  { target: "dog"   , source: "cat" , strength: 0.1 },
  { target: "fox"   , source: "ant" , strength: 0.1 },
  { target: "pike"  , source: "dog" , strength: 0.1 }
]
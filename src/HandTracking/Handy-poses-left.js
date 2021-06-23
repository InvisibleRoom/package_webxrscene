
//  Copyright © 2020–2021 Stewart Smith. See LICENSE for details.




//  Oculus Quest has trouble with finger overlaps 
//  as illustrated by American Sign Language (ASL)
//  for M, N, R, T, X etc.

const poses = [






	    //////////////
	   //          //
	  //   Misc   //
	 //          //
	//////////////


	{"names":["rest"],"handedness":"left","handyRevision":5,"time":1621870340884,"headPosition":[228,-319,-29],"headRotation":[0.042313734006100286,0.0793769324853405,0.08404512224641432,0.9923937055825774],"jointPositions":[[0,0,0],[24,-23,-37],[36,-41,-62],[32,-57,-91],[36,-71,-111],[16,-9,-41],[24,-7,-96],[21,-25,-130],[19,-45,-143],[16,-64,-154],[3,-9,-41],[2,-3,-96],[-5,-24,-132],[-7,-46,-148],[-9,-68,-161],[-8,-9,-38],[-17,-7,-89],[-26,-26,-121],[-27,-49,-135],[-25,-72,-143],[-23,-9,-34],[-35,-14,-78],[-43,-30,-102],[-42,-49,-109],[-38,-69,-118]],"digitTipPositions":[[36,-71,-111],[16,-64,-154],[-9,-68,-161],[-25,-72,-143],[-38,-69,-118]]},
	
	{"names":["flat"],"handedness":"left","handyRevision":5,"time":1622838692830,"headPosition":[-37,-306,146],"headRotation":[-0.16087238216297503,0.736996354269557,0.11679953861143919,0.6459980712285526],"jointPositions":[[0,0,0],[28,-19,-36],[45,-18,-64],[46,-21,-98],[47,-25,-122],[16,-9,-41],[24,-7,-96],[17,-21,-131],[13,-30,-153],[7,-35,-174],[3,-9,-41],[2,-3,-96],[-4,-22,-134],[-7,-34,-158],[-12,-40,-182],[-8,-9,-38],[-17,-7,-89],[-20,-21,-125],[-23,-32,-149],[-24,-38,-172],[-23,-9,-34],[-35,-14,-78],[-34,-21,-108],[-35,-27,-127],[-35,-31,-149]],"digitTipPositions":[[47,-25,-122],[7,-35,-174],[-12,-40,-182],[-24,-38,-172],[-35,-31,-149]]},

	{"names":["flare"],"handedness":"left","handyRevision":5,"time":1621870729293,"headPosition":[224,-266,-10],"headRotation":[-0.04992509472591704,0.06641473014981725,0.002912952517820356,0.9965380489834185],"jointPositions":[[0,0,0],[33,-9,-31],[60,-11,-49],[85,-12,-71],[108,-9,-80],[16,-9,-41],[24,-7,-96],[33,-1,-132],[38,3,-156],[42,11,-176],[3,-9,-41],[2,-3,-96],[3,5,-138],[4,9,-165],[4,19,-188],[-8,-9,-38],[-17,-7,-89],[-21,1,-127],[-23,6,-153],[-24,13,-176],[-23,-9,-34],[-35,-14,-78],[-45,-4,-105],[-54,2,-123],[-61,11,-141]],"digitTipPositions":[[108,-9,-80],[42,11,-176],[4,19,-188],[-24,13,-176],[-61,11,-141]]},

	{"names":["devil","bull","🤘"],"handedness":"left","handyRevision":5,"time":1621870797909,"headPosition":[172,-355,-52],"headRotation":[-0.14613844665483355,0.03216120412662604,-0.08777611686557621,0.9848373274434009],"jointPositions":[[0,0,0],[23,-24,-38],[30,-47,-60],[4,-57,-79],[-19,-58,-85],[16,-9,-41],[24,-7,-96],[28,-18,-132],[31,-28,-154],[32,-35,-175],[3,-9,-41],[2,-3,-96],[0,-42,-113],[4,-45,-86],[8,-23,-75],[-8,-9,-38],[-17,-7,-89],[-17,-42,-104],[-9,-52,-81],[-5,-33,-66],[-23,-9,-34],[-35,-14,-78],[-45,-25,-105],[-53,-33,-121],[-61,-38,-141]],"digitTipPositions":[[-19,-58,-85],[32,-35,-175],[8,-23,-75],[-5,-33,-66],[-61,-38,-141]]},

	{"names":["love","🤟"],"handedness":"left","handyRevision":5,"time":1621870846672,"headPosition":[76,-367,-49],"headRotation":[-0.1152941543929793,0.048167698917214355,-0.052965546817437634,0.9907480912876637],"jointPositions":[[0,0,0],[33,-8,-30],[61,-13,-46],[87,-16,-67],[110,-16,-77],[16,-9,-41],[24,-7,-96],[32,-15,-132],[37,-24,-154],[41,-29,-176],[3,-9,-41],[2,-3,-96],[0,-40,-117],[3,-46,-90],[8,-31,-71],[-8,-9,-38],[-17,-7,-89],[-18,-40,-109],[-10,-48,-85],[-5,-32,-67],[-23,-9,-34],[-35,-14,-78],[-43,-26,-105],[-48,-37,-121],[-52,-48,-140]],"digitTipPositions":[[110,-16,-77],[41,-29,-176],[8,-31,-71],[-5,-32,-67],[-52,-48,-140]]},

	{"names":["vulcan","🖖"],"handedness":"left","handyRevision":5,"time":1621870872498,"headPosition":[138,-358,-122],"headRotation":[-0.04294578752919011,0.041824031577178906,-0.030016467247729422,0.9977501798111046],"jointPositions":[[0,0,0],[33,-6,-30],[61,-7,-46],[86,-7,-68],[108,-5,-79],[16,-9,-41],[24,-7,-96],[25,-9,-134],[25,-12,-158],[24,-14,-180],[3,-9,-41],[2,-3,-96],[4,-8,-138],[6,-12,-165],[6,-12,-190],[-8,-9,-38],[-17,-7,-89],[-34,-12,-123],[-45,-20,-147],[-54,-25,-169],[-23,-9,-34],[-35,-14,-78],[-49,-12,-105],[-57,-18,-123],[-65,-22,-143]],"digitTipPositions":[[108,-5,-79],[24,-14,-180],[6,-12,-190],[-54,-25,-169],[-65,-22,-143]]},

	{"names":["vulcan inverse"],"handedness":"left","handyRevision":5,"time":1621870905109,"headPosition":[33,-360,-118],"headRotation":[-0.06983393567810782,0.05415511046157339,-0.06155924014684721,0.9941835367251566],"jointPositions":[[0,0,0],[33,-6,-29],[63,-14,-39],[91,-22,-55],[115,-25,-60],[16,-9,-41],[24,-7,-96],[35,-8,-132],[42,-11,-155],[48,-14,-177],[3,-9,-41],[2,-3,-96],[-8,-6,-137],[-14,-10,-164],[-21,-9,-188],[-8,-9,-38],[-17,-7,-89],[-26,-10,-127],[-33,-12,-152],[-37,-13,-176],[-23,-9,-34],[-35,-14,-78],[-55,-11,-101],[-69,-10,-115],[-83,-6,-132]],"digitTipPositions":[[115,-25,-60],[48,-14,-177],[-21,-9,-188],[-37,-13,-176],[-83,-6,-132]]},
	
	{"names":["bird","middle finger","🖕"],"handedness":"left","handyRevision":5,"time":1621870934292,"headPosition":[29,-365,13],"headRotation":[-0.09765417588049972,0.04561368081047964,-0.04616405326027284,0.9931021767911381],"jointPositions":[[0,0,0],[24,-23,-38],[34,-41,-63],[10,-51,-85],[-14,-53,-90],[16,-9,-41],[24,-7,-96],[23,-42,-111],[21,-44,-87],[21,-26,-74],[3,-9,-41],[2,-3,-96],[5,-27,-130],[8,-44,-152],[9,-59,-172],[-8,-9,-38],[-17,-7,-89],[-17,-43,-103],[-9,-44,-77],[-5,-26,-62],[-23,-9,-34],[-35,-14,-78],[-29,-42,-87],[-21,-45,-69],[-15,-29,-55]],"digitTipPositions":[[-14,-53,-90],[21,-26,-74],[9,-59,-172],[-5,-26,-62],[-15,-29,-55]]},

	{"names":["pinch"],"handedness":"left","handyRevision":5,"time":1621870973822,"headPosition":[-80,-375,-14],"headRotation":[-0.0592691555368637,0.08070381363327728,-0.04523214167279594,0.9939457300835792],"jointPositions":[[0,0,0],[23,-23,-38],[30,-49,-57],[26,-72,-81],[29,-91,-96],[16,-9,-41],[24,-7,-96],[30,-41,-113],[28,-65,-110],[23,-86,-106],[3,-9,-41],[2,-3,-96],[1,-45,-103],[6,-45,-76],[11,-25,-62],[-8,-9,-38],[-17,-7,-89],[-14,-45,-91],[-8,-41,-65],[-5,-21,-52],[-23,-9,-34],[-35,-14,-78],[-26,-43,-78],[-22,-39,-59],[-20,-21,-47]],"digitTipPositions":[[29,-91,-96],[23,-86,-106],[11,-25,-62],[-5,-21,-52],[-20,-21,-47]]},

	{"names":["grab"],"handedness":"left","handyRevision":5,"time":1621871012181,"headPosition":[137,-356,-110],"headRotation":[-0.09641663327072797,0.06199126892725712,-0.03122037558161582,0.992918024589878],"jointPositions":[[0,0,0],[27,-20,-36],[42,-38,-59],[34,-56,-86],[18,-67,-102],[16,-9,-41],[24,-7,-96],[24,-21,-131],[24,-44,-124],[22,-57,-106],[3,-9,-41],[2,-3,-96],[-3,-25,-132],[0,-47,-115],[6,-52,-91],[-8,-9,-38],[-17,-7,-89],[-21,-39,-110],[-11,-56,-91],[-1,-54,-69],[-23,-9,-34],[-35,-14,-78],[-28,-43,-82],[-18,-52,-67],[-8,-43,-50]],"digitTipPositions":[[18,-67,-102],[22,-57,-106],[6,-52,-91],[-1,-54,-69],[-8,-43,-50]]},

	{"names":["crook only thumb"],"handedness":"left","handyRevision":5,"time":1621871085295,"headPosition":[84,-361,-92],"headRotation":[-0.048161230828918475,0.05242634667049729,-0.04066655647431307,0.9966334356117791],"jointPositions":[[0,0,0],[33,-8,-30],[60,-12,-47],[59,-31,-75],[39,-43,-84],[16,-9,-41],[24,-7,-96],[25,-14,-133],[25,-20,-157],[24,-25,-179],[3,-9,-41],[2,-3,-96],[1,-12,-137],[1,-18,-164],[0,-23,-189],[-8,-9,-38],[-17,-7,-89],[-24,-10,-127],[-28,-15,-153],[-30,-18,-177],[-23,-9,-34],[-35,-14,-78],[-48,-11,-106],[-56,-14,-124],[-64,-15,-144]],"digitTipPositions":[[39,-43,-84],[24,-25,-179],[0,-23,-189],[-30,-18,-177],[-64,-15,-144]]},

	{"names":["crook only index"],"handedness":"left","handyRevision":5,"time":1621871116568,"headPosition":[109,-354,-92],"headRotation":[-0.025244615259063023,0.06940812270429603,-0.003147654385321818,0.9972639139799938],"jointPositions":[[0,0,0],[33,-9,-31],[60,-16,-47],[84,-24,-70],[104,-30,-83],[16,-9,-41],[24,-7,-96],[26,-11,-134],[26,-35,-129],[24,-42,-108],[3,-9,-41],[2,-3,-96],[3,-7,-138],[3,-11,-166],[3,-12,-191],[-8,-9,-38],[-17,-7,-89],[-27,-4,-126],[-34,-3,-152],[-39,0,-176],[-23,-9,-34],[-35,-14,-78],[-50,-5,-103],[-62,1,-119],[-73,8,-136]],"digitTipPositions":[[104,-30,-83],[24,-42,-108],[3,-12,-191],[-39,0,-176],[-73,8,-136]]},
	
	{"names":["crook only middle"],"handedness":"left","handyRevision":5,"time":1621871143565,"headPosition":[10,-330,-80],"headRotation":[-0.05540664951072286,0.09246454859110617,-0.039987209005985715,0.9933687295694825],"jointPositions":[[0,0,0],[33,-9,-31],[60,-15,-47],[87,-19,-67],[109,-22,-78],[16,-9,-41],[24,-7,-96],[33,-20,-131],[39,-29,-152],[43,-37,-173],[3,-9,-41],[2,-3,-96],[-3,-16,-136],[0,-39,-121],[5,-45,-97],[-8,-9,-38],[-17,-7,-89],[-33,-12,-124],[-43,-18,-148],[-52,-23,-170],[-23,-9,-34],[-35,-14,-78],[-55,-11,-101],[-69,-11,-116],[-82,-12,-133]],"digitTipPositions":[[109,-22,-78],[43,-37,-173],[5,-45,-97],[-52,-23,-170],[-82,-12,-133]]},

	{"names":["crook only ring"],"handedness":"left","handyRevision":5,"time":1621871174756,"headPosition":[162,-243,-137],"headRotation":[-0.03531085193242154,0.08132296593588238,-0.06410119332766226,0.9939973621394745],"jointPositions":[[0,0,0],[33,-7,-30],[61,-12,-46],[89,-13,-65],[111,-13,-75],[16,-9,-41],[24,-7,-96],[31,-5,-133],[36,-9,-157],[39,-13,-178],[3,-9,-41],[2,-3,-96],[1,-7,-138],[1,-13,-165],[0,-16,-190],[-8,-9,-38],[-17,-7,-89],[-30,-18,-124],[-21,-41,-113],[-9,-47,-93],[-23,-9,-34],[-35,-14,-78],[-54,-11,-102],[-67,-12,-117],[-80,-9,-135]],"digitTipPositions":[[111,-13,-75],[39,-13,-178],[0,-16,-190],[-9,-47,-93],[-80,-9,-135]]},

	{"names":["crook only pinky"],"handedness":"left","handyRevision":5,"time":1621871196045,"headPosition":[118,-343,-147],"headRotation":[-0.05171503372828628,0.05318582908522139,-0.03922934621709521,0.9964727196529259],"jointPositions":[[0,0,0],[33,-8,-30],[58,-3,-51],[72,-6,-81],[84,-10,-102],[16,-9,-41],[24,-7,-96],[35,-4,-132],[42,-6,-155],[47,-8,-177],[3,-9,-41],[2,-3,-96],[5,-2,-138],[7,-3,-166],[8,-3,-191],[-8,-9,-38],[-17,-7,-89],[-22,-7,-127],[-25,-10,-154],[-27,-13,-178],[-23,-9,-34],[-35,-14,-78],[-42,-26,-105],[-32,-43,-99],[-20,-44,-81]],"digitTipPositions":[[84,-10,-102],[47,-8,-177],[8,-3,-191],[-27,-13,-178],[-20,-44,-81]]},

	{"names":["thumb","thumb up","thumb down","👍","👎"],"handedness":"left","handyRevision":5,"time":1621874504996,"headPosition":[208,-220,187],"headRotation":[-0.10413736410854106,-0.13845956424681852,-0.061015808711887554,0.9829859737676301],"jointPositions":[[0,0,0],[33,-8,-30],[60,-10,-49],[86,-8,-70],[108,-6,-80],[16,-9,-41],[24,-7,-96],[21,-45,-102],[21,-41,-78],[22,-20,-68],[3,-9,-41],[2,-3,-96],[2,-45,-97],[4,-45,-70],[8,-22,-60],[-8,-9,-38],[-17,-7,-89],[-14,-45,-88],[-9,-42,-62],[-8,-18,-56],[-23,-9,-34],[-35,-14,-78],[-26,-43,-79],[-22,-42,-59],[-23,-21,-53]],"digitTipPositions":[[108,-6,-80],[22,-20,-68],[8,-22,-60],[-8,-18,-56],[-23,-21,-53]]},

	{"names":["walk index down"],"handedness":"left","handyRevision":5,"time":1622838940850,"headPosition":[210,-229,-182],"headRotation":[0.018567989878047544,0.13087108802529573,-0.0842125910254808,0.9876417495981804],"jointPositions":[[0,0,0],[22,-24,-38],[29,-46,-61],[11,-60,-86],[6,-76,-104],[16,-9,-41],[24,-7,-96],[21,-42,-112],[19,-66,-114],[16,-87,-120],[3,-9,-41],[2,-3,-96],[-4,-25,-132],[-8,-39,-155],[-13,-47,-178],[-8,-9,-38],[-17,-7,-89],[-21,-42,-105],[-9,-52,-83],[0,-37,-66],[-23,-9,-34],[-35,-14,-78],[-30,-43,-87],[-20,-51,-72],[-12,-38,-56]],"digitTipPositions":[[6,-76,-104],[16,-87,-120],[-13,-47,-178],[0,-37,-66],[-12,-38,-56]]},

	{"names":["walk middle down"],"handedness":"left","handyRevision":5,"time":1622838929543,"headPosition":[222,-212,-98],"headRotation":[-0.029124571298756327,0.12533504788819275,-0.06603274110385798,0.989486008434431],"jointPositions":[[0,0,0],[20,-25,-39],[25,-44,-65],[-1,-51,-85],[-14,-62,-103],[16,-9,-41],[24,-7,-96],[24,-13,-134],[24,-17,-157],[22,-18,-180],[3,-9,-41],[2,-3,-96],[-5,-39,-118],[-7,-65,-125],[-12,-87,-137],[-8,-9,-38],[-17,-7,-89],[-18,-44,-101],[-8,-52,-78],[-1,-36,-61],[-23,-9,-34],[-35,-14,-78],[-29,-43,-84],[-19,-50,-68],[-12,-37,-52]],"digitTipPositions":[[-14,-62,-103],[22,-18,-180],[-12,-87,-137],[-1,-36,-61],[-12,-37,-52]]},

	//  Note that this pose only contains thumb and index positions.
	//  Right now it’s “too close” to Rest...
	//
	//{"names":["pinch"],"handedness":"left","handyRevision":4,"time":1597940692048,"headPosition":[-938,-443,-5899],"headRotation":[-3.700743415417188e-17,0,0,1],"jointPositions":[[0,0,0],[36,19,-28],[51,44,-43],[74,68,-39],[90,82,-26],[41,9,-16],[96,7,-24],[114,41,-25],[104,63,-22],[90,80,-17]],"digitTipPositions":[[90,82,-26],[90,80,-17],[177,52,3],[173,36,24],[144,19,65]]},






	    /////////////////////
	   //                 //
	  //   ASL Letters   //
	 //                 //
	/////////////////////


	{"names":["asl a"],"handedness":"left","handyRevision":5,"time":1621871778897,"headPosition":[182,-314,-49],"headRotation":[-0.019499852484758707,0.13519208424834633,-0.016835377760294666,0.9904844400501002],"jointPositions":[[0,0,0],[28,-20,-36],[44,-28,-63],[42,-38,-95],[44,-48,-118],[16,-9,-41],[24,-7,-96],[20,-43,-108],[22,-45,-84],[24,-30,-68],[3,-9,-41],[2,-3,-96],[1,-45,-104],[6,-47,-76],[11,-29,-59],[-8,-9,-38],[-17,-7,-89],[-15,-45,-96],[-8,-46,-70],[-5,-27,-56],[-23,-9,-34],[-35,-14,-78],[-28,-43,-85],[-21,-46,-67],[-17,-28,-54]],"digitTipPositions":[[44,-48,-118],[24,-30,-68],[11,-29,-59],[-5,-27,-56],[-17,-28,-54]]},

	{"names":["asl b"],"handedness":"left","handyRevision":5,"time":1621871797724,"headPosition":[106,-283,-133],"headRotation":[-0.016803011780765674,0.14045297940279608,-0.04276299160758588,0.9890207004499837],"jointPositions":[[0,0,0],[17,-26,-39],[23,-32,-70],[-4,-31,-91],[-28,-27,-88],[16,-9,-41],[24,-7,-96],[18,-16,-132],[14,-26,-154],[9,-35,-174],[3,-9,-41],[2,-3,-96],[-3,-13,-137],[-7,-22,-163],[-11,-29,-187],[-8,-9,-38],[-17,-7,-89],[-22,-15,-127],[-24,-22,-152],[-26,-28,-175],[-23,-9,-34],[-35,-14,-78],[-36,-17,-108],[-38,-22,-128],[-38,-27,-149]],"digitTipPositions":[[-28,-27,-88],[9,-35,-174],[-11,-29,-187],[-26,-28,-175],[-38,-27,-149]]},
	
	{"names":["asl c"],"handedness":"left","handyRevision":5,"time":1621871824275,"headPosition":[293,44,-167],"headRotation":[-0.015769441657005542,0.112834419485063,-0.035860055813715576,0.992841263536418],"jointPositions":[[0,0,0],[28,-19,-36],[41,-47,-47],[39,-74,-66],[29,-92,-80],[16,-9,-41],[24,-7,-96],[17,-19,-132],[15,-42,-139],[14,-64,-136],[3,-9,-41],[2,-3,-96],[-4,-18,-135],[-4,-45,-140],[-2,-69,-134],[-8,-9,-38],[-17,-7,-89],[-27,-19,-125],[-26,-43,-135],[-20,-67,-134],[-23,-9,-34],[-35,-14,-78],[-46,-22,-105],[-45,-40,-115],[-42,-59,-125]],"digitTipPositions":[[29,-92,-80],[14,-64,-136],[-2,-69,-134],[-20,-67,-134],[-42,-59,-125]]},

	{"names":["asl ch"],"handedness":"left","handyRevision":5,"time":1621871850479,"headPosition":[134,-368,-103],"headRotation":[-0.14110001342866,0.04533962313519235,-0.053365810088084144,0.9875156674652266],"jointPositions":[[0,0,0],[33,-6,-29],[61,-6,-45],[89,-2,-64],[112,4,-70],[16,-9,-41],[24,-7,-96],[16,-3,-133],[10,-4,-157],[4,-3,-178],[3,-9,-41],[2,-3,-96],[-5,-13,-137],[-9,-20,-163],[-14,-20,-188],[-8,-9,-38],[-17,-7,-89],[-19,-39,-110],[-11,-48,-86],[-4,-35,-66],[-23,-9,-34],[-35,-14,-78],[-31,-42,-89],[-21,-52,-74],[-11,-45,-56]],"digitTipPositions":[[112,4,-70],[4,-3,-178],[-14,-20,-188],[-4,-35,-66],[-11,-45,-56]]},

	{"names":["asl d"],"handedness":"left","handyRevision":5,"time":1621871879065,"headPosition":[82,-336,-76],"headRotation":[-0.03353359924419279,0.12287977213974101,-0.04041665519891565,0.9910310553223595],"jointPositions":[[0,0,0],[23,-23,-38],[32,-45,-61],[10,-57,-83],[-14,-59,-90],[16,-9,-41],[24,-7,-96],[23,-14,-133],[22,-22,-156],[19,-27,-178],[3,-9,-41],[2,-3,-96],[0,-40,-117],[3,-46,-90],[8,-25,-77],[-8,-9,-38],[-17,-7,-89],[-18,-41,-107],[-10,-49,-83],[-6,-29,-69],[-23,-9,-34],[-35,-14,-78],[-34,-41,-92],[-23,-53,-79],[-14,-40,-64]],"digitTipPositions":[[-14,-59,-90],[19,-27,-178],[8,-25,-77],[-6,-29,-69],[-14,-40,-64]]},

	{"names":["asl e"],"handedness":"left","handyRevision":5,"time":1621871902498,"headPosition":[240,-223,-110],"headRotation":[-0.07470552022672951,0.11509268691627174,-0.04199302744642415,0.989651121681134],"jointPositions":[[0,0,0],[24,-23,-38],[33,-47,-58],[9,-59,-78],[-15,-58,-83],[16,-9,-41],[24,-7,-96],[22,-37,-120],[21,-52,-100],[21,-46,-78],[3,-9,-41],[2,-3,-96],[-2,-33,-126],[1,-52,-107],[7,-56,-82],[-8,-9,-38],[-17,-7,-89],[-21,-34,-116],[-13,-55,-101],[-4,-58,-79],[-23,-9,-34],[-35,-14,-78],[-38,-34,-101],[-28,-49,-92],[-15,-55,-76]],"digitTipPositions":[[-15,-58,-83],[21,-46,-78],[7,-56,-82],[-4,-58,-79],[-15,-55,-76]]},

	{"names":["asl f"],"handedness":"left","handyRevision":5,"time":1621871946803,"headPosition":[285,-154,-118],"headRotation":[-0.07042098151078573,0.11591182654618942,-0.025152650726378848,0.9904406477814583],"jointPositions":[[0,0,0],[28,-20,-36],[43,-40,-56],[38,-59,-83],[19,-69,-97],[16,-9,-41],[24,-7,-96],[17,-32,-124],[17,-55,-114],[20,-67,-95],[3,-9,-41],[2,-3,-96],[-2,-17,-136],[-4,-27,-161],[-8,-31,-186],[-8,-9,-38],[-17,-7,-89],[-22,-14,-127],[-25,-22,-152],[-27,-26,-176],[-23,-9,-34],[-35,-14,-78],[-43,-16,-107],[-48,-24,-126],[-52,-29,-146]],"digitTipPositions":[[19,-69,-97],[20,-67,-95],[-8,-31,-186],[-27,-26,-176],[-52,-29,-146]]},

	{"names":["asl g","fire point","👆","👉","👇","👈"],"handedness":"left","handyRevision":5,"time":1621871992236,"headPosition":[152,-320,5],"headRotation":[-0.12025793906110596,0.07165933203263994,-0.049117525611445945,0.9889339901669068],"jointPositions":[[0,0,0],[24,-23,-38],[35,-34,-66],[21,-44,-96],[9,-52,-116],[16,-9,-41],[24,-7,-96],[15,-10,-133],[10,-20,-154],[3,-26,-175],[3,-9,-41],[2,-3,-96],[1,-45,-102],[6,-47,-75],[11,-39,-52],[-8,-9,-38],[-17,-7,-89],[-14,-45,-87],[-6,-46,-61],[1,-38,-39],[-23,-9,-34],[-35,-14,-78],[-26,-43,-77],[-19,-47,-59],[-11,-40,-39]],"digitTipPositions":[[9,-52,-116],[3,-26,-175],[11,-39,-52],[1,-38,-39],[-11,-40,-39]]},

	{"names":["asl h"],"handedness":"left","handyRevision":5,"time":1621874757545,"headPosition":[205,-344,-16],"headRotation":[-0.09469252775371846,-0.10182401471920463,-0.06394111551742929,0.9882189680900528],"jointPositions":[[0,0,0],[24,-23,-38],[35,-33,-66],[14,-41,-91],[-8,-46,-101],[16,-9,-41],[24,-7,-96],[18,-16,-132],[14,-27,-154],[8,-34,-174],[3,-9,-41],[2,-3,-96],[-4,-23,-133],[-8,-35,-157],[-13,-42,-181],[-8,-9,-38],[-17,-7,-89],[-16,-44,-98],[-8,-44,-73],[-2,-25,-58],[-23,-9,-34],[-35,-14,-78],[-27,-43,-80],[-19,-45,-62],[-12,-31,-46]],"digitTipPositions":[[-8,-46,-101],[8,-34,-174],[-13,-42,-181],[-2,-25,-58],[-12,-31,-46]]},

	{"names":["asl i"],"handedness":"left","handyRevision":5,"time":1621874785896,"headPosition":[209,-245,-147],"headRotation":[-0.009838126529548984,-0.02254838053924534,-0.05005611914789935,0.9984433718110498],"jointPositions":[[0,0,0],[23,-24,-38],[31,-45,-61],[12,-59,-86],[-12,-60,-94],[16,-9,-41],[24,-7,-96],[21,-39,-116],[22,-45,-93],[23,-28,-78],[3,-9,-41],[2,-3,-96],[0,-41,-114],[4,-48,-88],[8,-30,-71],[-8,-9,-38],[-17,-7,-89],[-19,-41,-107],[-10,-52,-84],[-3,-38,-66],[-23,-9,-34],[-35,-14,-78],[-44,-22,-106],[-52,-27,-124],[-58,-29,-145]],"digitTipPositions":[[-12,-60,-94],[23,-28,-78],[8,-30,-71],[-3,-38,-66],[-58,-29,-145]]},

	{"names":["asl j"],"handedness":"left","handyRevision":5,"time":1621874806141,"headPosition":[81,-372,-62],"headRotation":[-0.1193971858043141,0.018630852201901558,-0.017104356346808108,0.9925243796603203],"jointPositions":[[0,0,0],[23,-24,-38],[31,-44,-62],[12,-57,-87],[-11,-60,-96],[16,-9,-41],[24,-7,-96],[23,-41,-113],[21,-45,-89],[21,-26,-77],[3,-9,-41],[2,-3,-96],[2,-42,-111],[3,-45,-84],[7,-24,-72],[-8,-9,-38],[-17,-7,-89],[-18,-42,-104],[-9,-50,-80],[-5,-29,-67],[-23,-9,-34],[-35,-14,-78],[-49,-34,-97],[-59,-47,-108],[-71,-58,-123]],"digitTipPositions":[[-11,-60,-96],[21,-26,-77],[7,-24,-72],[-5,-29,-67],[-71,-58,-123]]},

	{"names":["asl k"],"handedness":"left","handyRevision":5,"time":1621874830200,"headPosition":[158,-326,-62],"headRotation":[-0.028979113756510227,-0.04323874215541325,-0.022131525157084293,0.9983991274498364],"jointPositions":[[0,0,0],[21,-25,-38],[30,-29,-69],[19,-30,-102],[13,-33,-125],[16,-9,-41],[24,-7,-96],[28,-26,-129],[30,-38,-150],[31,-45,-171],[3,-9,-41],[2,-3,-96],[-5,-31,-127],[-9,-50,-147],[-15,-63,-167],[-8,-9,-38],[-17,-7,-89],[-14,-45,-88],[-6,-46,-63],[-1,-30,-46],[-23,-9,-34],[-35,-14,-78],[-26,-43,-74],[-19,-44,-54],[-13,-33,-37]],"digitTipPositions":[[13,-33,-125],[31,-45,-171],[-15,-63,-167],[-1,-30,-46],[-13,-33,-37]]},

	{"names":["asl l"],"handedness":"left","handyRevision":5,"time":1621874854915,"headPosition":[124,-342,-101],"headRotation":[-0.04056130114109347,-0.012641947539927575,-0.03336729866091117,0.9985397264789792],"jointPositions":[[0,0,0],[33,-8,-30],[61,-13,-47],[87,-15,-68],[109,-16,-78],[16,-9,-41],[24,-7,-96],[22,-15,-133],[20,-23,-156],[17,-29,-177],[3,-9,-41],[2,-3,-96],[0,-44,-107],[6,-50,-81],[12,-36,-61],[-8,-9,-38],[-17,-7,-89],[-15,-45,-95],[-8,-45,-69],[-2,-28,-53],[-23,-9,-34],[-35,-14,-78],[-27,-43,-82],[-20,-43,-63],[-16,-25,-52]],"digitTipPositions":[[109,-16,-78],[17,-29,-177],[12,-36,-61],[-2,-28,-53],[-16,-25,-52]]},

	{"names":["asl m"],"handedness":"left","handyRevision":5,"time":1621874899359,"headPosition":[-7,-329,-74],"headRotation":[-0.10023329730644388,0.019886358808611837,-0.09346890997315044,0.9903642664417475],"jointPositions":[[0,0,0],[21,-25,-38],[25,-49,-60],[-1,-59,-80],[-20,-68,-93],[16,-9,-41],[24,-7,-96],[20,-38,-118],[21,-53,-99],[21,-57,-77],[3,-9,-41],[2,-3,-96],[-1,-34,-125],[2,-53,-105],[6,-63,-83],[-8,-9,-38],[-17,-7,-89],[-17,-37,-113],[-12,-62,-103],[-5,-70,-81],[-23,-9,-34],[-35,-14,-78],[-28,-43,-84],[-21,-58,-72],[-10,-69,-57]],"digitTipPositions":[[-20,-68,-93],[21,-57,-77],[6,-63,-83],[-5,-70,-81],[-10,-69,-57]]},

	{"names":["asl n"],"handedness":"left","handyRevision":5,"time":1621874947800,"headPosition":[69,-339,-86],"headRotation":[-0.1260730941506564,0.012984495560338512,-0.06277382522941126,0.989947687334436],"jointPositions":[[0,0,0],[22,-24,-38],[28,-47,-61],[5,-59,-82],[-15,-67,-94],[16,-9,-41],[24,-7,-96],[25,-41,-113],[21,-62,-101],[17,-81,-89],[3,-9,-41],[2,-3,-96],[1,-38,-119],[2,-62,-106],[4,-80,-88],[-8,-9,-38],[-17,-7,-89],[-16,-45,-97],[-8,-54,-74],[-3,-36,-57],[-23,-9,-34],[-35,-14,-78],[-27,-43,-81],[-19,-48,-64],[-12,-36,-47]],"digitTipPositions":[[-15,-67,-94],[17,-81,-89],[4,-80,-88],[-3,-36,-57],[-12,-36,-47]]},

	{"names":["asl o","loupe"],"handedness":"left","handyRevision":5,"time":1621874979309,"headPosition":[263,-147,-170],"headRotation":[-0.052768789541090794,0.010279973383880656,-0.02899980022490039,0.998132650773966],"jointPositions":[[0,0,0],[25,-22,-37],[36,-48,-54],[27,-70,-78],[6,-77,-89],[16,-9,-41],[24,-7,-96],[15,-37,-118],[16,-59,-108],[19,-74,-92],[3,-9,-41],[2,-3,-96],[-8,-36,-120],[-3,-60,-107],[7,-73,-88],[-8,-9,-38],[-17,-7,-89],[-25,-35,-114],[-17,-59,-104],[-5,-72,-87],[-23,-9,-34],[-35,-14,-78],[-38,-35,-100],[-31,-54,-97],[-18,-69,-88]],"digitTipPositions":[[6,-77,-89],[19,-74,-92],[7,-73,-88],[-5,-72,-87],[-18,-69,-88]]},

	{"names":["asl p"],"handedness":"left","handyRevision":5,"time":1621875141939,"headPosition":[324,-37,-48],"headRotation":[0.07310354596958854,-0.05858616953154791,-0.07153327076220885,0.9930289635753409],"jointPositions":[[0,0,0],[23,-23,-38],[34,-37,-66],[29,-48,-97],[24,-57,-119],[16,-9,-41],[24,-7,-96],[19,-8,-134],[16,-11,-158],[12,-11,-180],[3,-9,-41],[2,-3,-96],[3,-38,-119],[4,-66,-119],[4,-91,-120],[-8,-9,-38],[-17,-7,-89],[-13,-42,-104],[-10,-68,-108],[-6,-92,-113],[-23,-9,-34],[-35,-14,-78],[-27,-39,-94],[-22,-58,-96],[-14,-78,-101]],"digitTipPositions":[[24,-57,-119],[12,-11,-180],[4,-91,-120],[-6,-92,-113],[-14,-78,-101]]},
	
	{"names":["asl q"],"handedness":"left","handyRevision":5,"time":1621875184308,"headPosition":[104,-258,-220],"headRotation":[0.07703235647263597,-0.0335867033420876,-0.0672623059090038,0.9941899873872886],"jointPositions":[[0,0,0],[23,-23,-38],[30,-51,-54],[33,-77,-75],[39,-97,-88],[16,-9,-41],[24,-7,-96],[23,-44,-106],[21,-68,-105],[18,-90,-109],[3,-9,-41],[2,-3,-96],[1,-45,-103],[5,-55,-78],[12,-38,-61],[-8,-9,-38],[-17,-7,-89],[-15,-45,-92],[-7,-49,-67],[-2,-28,-54],[-23,-9,-34],[-35,-14,-78],[-27,-43,-80],[-19,-44,-61],[-14,-28,-47]],"digitTipPositions":[[39,-97,-88],[18,-90,-109],[12,-38,-61],[-2,-28,-54],[-14,-28,-47]]},

	{"names":["asl r"],"handedness":"left","handyRevision":5,"time":1621875274715,"headPosition":[216,-302,-93],"headRotation":[0.06510766615081523,-0.02983815151591771,-0.025680876928263853,0.9971013834983259],"jointPositions":[[0,0,0],[24,-23,-38],[34,-40,-63],[11,-50,-86],[-7,-59,-100],[16,-9,-41],[24,-7,-96],[14,-23,-129],[9,-37,-148],[2,-48,-166],[3,-9,-41],[2,-3,-96],[-5,-13,-137],[-9,-24,-161],[-14,-29,-185],[-8,-9,-38],[-17,-7,-89],[-17,-43,-103],[-9,-48,-78],[-4,-30,-63],[-23,-9,-34],[-35,-14,-78],[-30,-43,-87],[-20,-50,-71],[-11,-38,-55]],"digitTipPositions":[[-7,-59,-100],[2,-48,-166],[-14,-29,-185],[-4,-30,-63],[-11,-38,-55]]},

	{"names":["asl s","fist","✊","👊","🤛","🤜"],"handedness":"left","handyRevision":5,"time":1621870370249,"headPosition":[203,-292,-19],"headRotation":[-0.017547499176952776,0.13279210878847558,0.1290836948078115,0.9825455389301496],"jointPositions":[[0,0,0],[23,-24,-38],[31,-45,-61],[10,-58,-84],[-14,-57,-89],[16,-9,-41],[24,-7,-96],[19,-41,-112],[22,-45,-88],[25,-25,-79],[3,-9,-41],[2,-3,-96],[0,-44,-107],[5,-44,-80],[10,-21,-71],[-8,-9,-38],[-17,-7,-89],[-15,-45,-93],[-7,-44,-68],[-4,-21,-60],[-23,-9,-34],[-35,-14,-78],[-27,-43,-80],[-20,-43,-61],[-17,-24,-50]],"digitTipPositions":[[-14,-57,-89],[25,-25,-79],[10,-21,-71],[-4,-21,-60],[-17,-24,-50]]},

	{"names":["asl t"],"handedness":"left","handyRevision":5,"time":1621875341312,"headPosition":[80,-305,-152],"headRotation":[0.008885164891425348,-0.08500178270105636,-0.029174463053758787,0.995913952803595],"jointPositions":[[0,0,0],[25,-22,-37],[37,-38,-64],[23,-50,-92],[7,-59,-108],[16,-9,-41],[24,-7,-96],[20,-41,-113],[20,-56,-94],[21,-61,-72],[3,-9,-41],[2,-3,-96],[-1,-42,-112],[4,-53,-87],[10,-51,-63],[-8,-9,-38],[-17,-7,-89],[-16,-44,-98],[-8,-51,-73],[-1,-40,-52],[-23,-9,-34],[-35,-14,-78],[-28,-43,-85],[-20,-48,-67],[-13,-36,-49]],"digitTipPositions":[[7,-59,-108],[21,-61,-72],[10,-51,-63],[-1,-40,-52],[-13,-36,-49]]},

	{"names":["asl u"],"handedness":"left","handyRevision":5,"time":1621875374841,"headPosition":[109,-385,-119],"headRotation":[0.03669679849630809,-0.08965324550882436,-0.020928895465911704,0.9950766913450697],"jointPositions":[[0,0,0],[23,-24,-38],[31,-43,-63],[6,-52,-84],[-14,-60,-97],[16,-9,-41],[24,-7,-96],[23,-16,-133],[23,-23,-156],[20,-26,-178],[3,-9,-41],[2,-3,-96],[3,-16,-136],[3,-25,-162],[2,-27,-187],[-8,-9,-38],[-17,-7,-89],[-17,-43,-102],[-9,-49,-77],[-4,-30,-63],[-23,-9,-34],[-35,-14,-78],[-29,-43,-85],[-20,-51,-68],[-12,-38,-52]],"digitTipPositions":[[-14,-60,-97],[20,-26,-178],[2,-27,-187],[-4,-30,-63],[-12,-38,-52]]},

	{"names":["asl v","peace","✌️"],"handedness":"left","handyRevision":5,"time":1621875402912,"headPosition":[122,-316,-124],"headRotation":[-0.046381640765697923,-0.1386975035631272,-0.04666913413286176,0.9881466168669708],"jointPositions":[[0,0,0],[22,-24,-38],[31,-38,-66],[7,-46,-88],[-16,-48,-96],[16,-9,-41],[24,-7,-96],[28,-17,-132],[30,-25,-155],[31,-31,-177],[3,-9,-41],[2,-3,-96],[-1,-20,-135],[-3,-31,-160],[-6,-36,-184],[-8,-9,-38],[-17,-7,-89],[-17,-43,-102],[-9,-46,-77],[-3,-27,-62],[-23,-9,-34],[-35,-14,-78],[-29,-43,-85],[-19,-49,-68],[-12,-35,-52]],"digitTipPositions":[[-16,-48,-96],[31,-31,-177],[-6,-36,-184],[-3,-27,-62],[-12,-35,-52]]},

	{"names":["asl w"],"handedness":"left","handyRevision":5,"time":1621875430912,"headPosition":[91,-299,-165],"headRotation":[0.005363275076511218,-0.08574498229404216,-0.037063463384950326,0.9956130437140168],"jointPositions":[[0,0,0],[19,-26,-39],[21,-48,-62],[-2,-58,-85],[-25,-59,-93],[16,-9,-41],[24,-7,-96],[33,-8,-133],[38,-11,-156],[42,-12,-178],[3,-9,-41],[2,-3,-96],[1,-1,-139],[0,-1,-166],[-2,1,-191],[-8,-9,-38],[-17,-7,-89],[-26,-10,-127],[-32,-14,-152],[-35,-21,-175],[-23,-9,-34],[-35,-14,-78],[-33,-34,-100],[-27,-54,-99],[-17,-57,-79]],"digitTipPositions":[[-25,-59,-93],[42,-12,-178],[-2,1,-191],[-35,-21,-175],[-17,-57,-79]]},
	
	{"names":["asl x"],"handedness":"left","handyRevision":5,"time":1621875479783,"headPosition":[204,-230,-126],"headRotation":[-0.035253246808133305,-0.1081898174369778,-0.04904097832277269,0.9922938851090634],"jointPositions":[[0,0,0],[26,-21,-37],[40,-39,-61],[20,-52,-85],[-3,-55,-91],[16,-9,-41],[24,-7,-96],[21,-13,-133],[20,-35,-143],[18,-57,-144],[3,-9,-41],[2,-3,-96],[-1,-42,-112],[4,-58,-91],[10,-59,-67],[-8,-9,-38],[-17,-7,-89],[-17,-44,-99],[-8,-58,-78],[1,-54,-56],[-23,-9,-34],[-35,-14,-78],[-29,-43,-85],[-20,-56,-72],[-10,-50,-53]],"digitTipPositions":[[-3,-55,-91],[18,-57,-144],[10,-59,-67],[1,-54,-56],[-10,-50,-53]]},

	{"names":["asl y"],"handedness":"left","handyRevision":5,"time":1621875524911,"headPosition":[151,-342,-69],"headRotation":[0.036581437519999545,-0.07335823014707835,-0.029505239595445182,0.9961976758259407],"jointPositions":[[0,0,0],[32,-11,-32],[58,-18,-51],[82,-23,-74],[101,-28,-89],[16,-9,-41],[24,-7,-96],[21,-45,-102],[21,-41,-78],[22,-20,-69],[3,-9,-41],[2,-3,-96],[2,-45,-101],[5,-44,-74],[9,-20,-66],[-8,-9,-38],[-17,-7,-89],[-15,-45,-97],[-9,-48,-71],[-7,-25,-63],[-23,-9,-34],[-35,-14,-78],[-46,-31,-101],[-50,-48,-111],[-52,-66,-124]],"digitTipPositions":[[101,-28,-89],[22,-20,-69],[9,-20,-66],[-7,-25,-63],[-52,-66,-124]]},

	{"names":["asl z","point"],"handedness":"left","handyRevision":5,"time":1621875547773,"headPosition":[212,-342,-12],"headRotation":[0.031743901208425594,-0.06209305218894014,-0.042621428217515016,0.9966544994485798],"jointPositions":[[0,0,0],[25,-22,-37],[37,-42,-60],[14,-55,-81],[-10,-54,-84],[16,-9,-41],[24,-7,-96],[29,-21,-131],[31,-42,-144],[31,-60,-156],[3,-9,-41],[2,-3,-96],[1,-44,-108],[4,-43,-80],[8,-20,-71],[-8,-9,-38],[-17,-7,-89],[-14,-45,-90],[-9,-42,-65],[-7,-18,-58],[-23,-9,-34],[-35,-14,-78],[-26,-43,-76],[-21,-43,-56],[-19,-25,-45]],"digitTipPositions":[[-10,-54,-84],[31,-60,-156],[8,-20,-71],[-7,-18,-58],[-19,-25,-45]]},






		///////////////////////
	   //                   //
	  //    ASL Numbers    //
	 //                   //
	///////////////////////


	{"names":["asl 1","point"],"handedness":"left","handyRevision":5,"time":1621874139596,"headPosition":[64,-351,-84],"headRotation":[-0.029158160599974753,-0.019127475048798265,-0.07787657102664286,0.9963529399451466],"jointPositions":[[0,0,0],[23,-24,-38],[30,-49,-57],[7,-63,-78],[-17,-59,-81],[16,-9,-41],[24,-7,-96],[31,-17,-132],[35,-24,-155],[37,-29,-177],[3,-9,-41],[2,-3,-96],[1,-43,-109],[4,-44,-82],[8,-21,-72],[-8,-9,-38],[-17,-7,-89],[-14,-45,-90],[-7,-45,-65],[-5,-22,-56],[-23,-9,-34],[-35,-14,-78],[-26,-43,-75],[-19,-46,-56],[-16,-28,-44]],"digitTipPositions":[[-17,-59,-81],[37,-29,-177],[8,-21,-72],[-5,-22,-56],[-16,-28,-44]]},

	{"names":["asl 2","peace","✌️"],"handedness":"left","handyRevision":5,"time":1621874075200,"headPosition":[151,-390,-87],"headRotation":[0.006502625489545991,-0.024572932419834225,-0.02214079376699433,0.9994316745529562],"jointPositions":[[0,0,0],[21,-24,-38],[28,-46,-62],[1,-55,-81],[-23,-55,-86],[16,-9,-41],[24,-7,-96],[35,-15,-131],[42,-21,-154],[48,-23,-175],[3,-9,-41],[2,-3,-96],[-7,-17,-135],[-12,-27,-160],[-18,-30,-184],[-8,-9,-38],[-17,-7,-89],[-17,-43,-102],[-9,-48,-77],[-5,-28,-64],[-23,-9,-34],[-35,-14,-78],[-28,-43,-84],[-19,-51,-68],[-14,-35,-54]],"digitTipPositions":[[-23,-55,-86],[48,-23,-175],[-18,-30,-184],[-5,-28,-64],[-14,-35,-54]]},

	{"names":["asl 3"],"handedness":"left","handyRevision":5,"time":1621874201097,"headPosition":[190,-342,-61],"headRotation":[-0.04114482518126441,-0.04672599021504886,-0.059016801086056524,0.9963136063146777],"jointPositions":[[0,0,0],[33,-8,-30],[60,-9,-48],[85,-9,-70],[107,-8,-81],[16,-9,-41],[24,-7,-96],[32,-10,-133],[36,-16,-156],[39,-17,-178],[3,-9,-41],[2,-3,-96],[-2,-20,-135],[-4,-31,-160],[-7,-35,-184],[-8,-9,-38],[-17,-7,-89],[-16,-44,-99],[-8,-48,-74],[-4,-29,-60],[-23,-9,-34],[-35,-14,-78],[-27,-43,-81],[-19,-48,-63],[-14,-32,-48]],"digitTipPositions":[[107,-8,-81],[39,-17,-178],[-7,-35,-184],[-4,-29,-60],[-14,-32,-48]]},

	{"names":["asl 4"],"handedness":"left","handyRevision":5,"time":1621874257740,"headPosition":[140,-362,-107],"headRotation":[0.03238182935539894,-0.02523442422633529,-0.024968573666132005,0.9988449385498364],"jointPositions":[[0,0,0],[17,-26,-39],[21,-37,-69],[-6,-36,-89],[-30,-31,-85],[16,-9,-41],[24,-7,-96],[33,-14,-132],[38,-20,-155],[42,-25,-177],[3,-9,-41],[2,-3,-96],[-1,-5,-138],[-2,-7,-166],[-5,-6,-191],[-8,-9,-38],[-17,-7,-89],[-28,-3,-126],[-35,-2,-152],[-40,3,-175],[-23,-9,-34],[-35,-14,-78],[-53,-9,-103],[-66,-7,-118],[-78,-2,-135]],"digitTipPositions":[[-30,-31,-85],[42,-25,-177],[-5,-6,-191],[-40,3,-175],[-78,-2,-135]]},

	{"names":["asl 5"],"handedness":"left","handyRevision":5,"time":1621874278975,"headPosition":[11,-375,-145],"headRotation":[-0.01424900891631985,-0.014852552866668253,-0.033428050597345875,0.9992291693359462],"jointPositions":[[0,0,0],[32,-11,-32],[58,-18,-50],[79,-26,-75],[95,-34,-92],[16,-9,-41],[24,-7,-96],[29,-14,-133],[32,-21,-156],[33,-26,-178],[3,-9,-41],[2,-3,-96],[-1,-10,-138],[-2,-16,-165],[-4,-20,-189],[-8,-9,-38],[-17,-7,-89],[-27,-3,-126],[-33,-5,-152],[-36,-12,-175],[-23,-9,-34],[-35,-14,-78],[-50,-7,-104],[-59,-9,-122],[-67,-12,-142]],"digitTipPositions":[[95,-34,-92],[33,-26,-178],[-4,-20,-189],[-36,-12,-175],[-67,-12,-142]]},

	{"names":["asl 6"],"handedness":"left","handyRevision":5,"time":1621874305650,"headPosition":[79,-333,-120],"headRotation":[-0.035647110822363375,-0.013440825782236418,-0.06558875464630948,0.9971192219848677],"jointPositions":[[0,0,0],[23,-24,-38],[30,-47,-60],[4,-58,-79],[-20,-56,-84],[16,-9,-41],[24,-7,-96],[34,-10,-132],[40,-17,-155],[44,-20,-177],[3,-9,-41],[2,-3,-96],[0,-7,-138],[-2,-12,-165],[-4,-11,-190],[-8,-9,-38],[-17,-7,-89],[-28,-12,-126],[-35,-18,-151],[-39,-27,-173],[-23,-9,-34],[-35,-14,-78],[-41,-32,-102],[-32,-50,-97],[-18,-52,-80]],"digitTipPositions":[[-20,-56,-84],[44,-20,-177],[-4,-11,-190],[-39,-27,-173],[-18,-52,-80]]},

	{"names":["asl 7"],"handedness":"left","handyRevision":5,"time":1621874326397,"headPosition":[85,-327,-141],"headRotation":[-0.02404793325717927,-0.03915655630906013,-0.05397512383887663,0.9974844093542959],"jointPositions":[[0,0,0],[22,-24,-38],[31,-42,-64],[10,-53,-88],[-14,-54,-94],[16,-9,-41],[24,-7,-96],[33,-10,-133],[39,-14,-156],[42,-16,-178],[3,-9,-41],[2,-3,-96],[-1,-4,-138],[-4,-9,-166],[-6,-11,-190],[-8,-9,-38],[-17,-7,-89],[-27,-23,-123],[-18,-43,-108],[-7,-46,-86],[-23,-9,-34],[-35,-14,-78],[-53,-16,-103],[-61,-28,-117],[-69,-39,-135]],"digitTipPositions":[[-14,-54,-94],[42,-16,-178],[-6,-11,-190],[-7,-46,-86],[-69,-39,-135]]},

	{"names":["asl 8"],"handedness":"left","handyRevision":5,"time":1621874353242,"headPosition":[78,-339,-125],"headRotation":[-0.0394012707434378,-0.018567670747027278,-0.06706900603639192,0.9967971357081135],"jointPositions":[[0,0,0],[24,-23,-38],[34,-42,-62],[22,-58,-89],[2,-64,-102],[16,-9,-41],[24,-7,-96],[28,-13,-133],[30,-24,-155],[31,-33,-175],[3,-9,-41],[2,-3,-96],[-7,-24,-132],[-3,-48,-119],[3,-61,-100],[-8,-9,-38],[-17,-7,-89],[-36,-18,-121],[-47,-32,-141],[-54,-46,-159],[-23,-9,-34],[-35,-14,-78],[-59,-11,-97],[-75,-11,-109],[-92,-8,-123]],"digitTipPositions":[[2,-64,-102],[31,-33,-175],[3,-61,-100],[-54,-46,-159],[-92,-8,-123]]},

	{"names":["asl 9"],"handedness":"left","handyRevision":5,"time":1621874380658,"headPosition":[89,-334,-145],"headRotation":[0.00175277867453723,-0.040796866892560436,-0.016166442497654962,0.9990351292865637],"jointPositions":[[0,0,0],[28,-19,-36],[44,-40,-55],[37,-60,-81],[21,-71,-96],[16,-9,-41],[24,-7,-96],[23,-34,-123],[22,-56,-111],[20,-69,-93],[3,-9,-41],[2,-3,-96],[-1,-12,-137],[-2,-19,-164],[-5,-21,-189],[-8,-9,-38],[-17,-7,-89],[-34,-7,-124],[-45,-8,-148],[-55,-6,-170],[-23,-9,-34],[-35,-14,-78],[-59,-10,-97],[-75,-10,-109],[-91,-6,-123]],"digitTipPositions":[[21,-71,-96],[20,-69,-93],[-5,-21,-189],[-55,-6,-170],[-91,-6,-123]]},

	{"names":["asl 10"],"handedness":"left","handyRevision":5,"time":1621874477261,"headPosition":[220,-224,101],"headRotation":[-0.10380468555712614,-0.13570943839560753,-0.05264908799584896,0.9838880041058812],"jointPositions":[[0,0,0],[32,-11,-32],[53,-6,-56],[72,3,-83],[92,13,-94],[16,-9,-41],[24,-7,-96],[20,-45,-102],[21,-43,-77],[23,-23,-67],[3,-9,-41],[2,-3,-96],[2,-45,-98],[5,-45,-70],[10,-24,-58],[-8,-9,-38],[-17,-7,-89],[-14,-45,-88],[-7,-43,-62],[-5,-21,-53],[-23,-9,-34],[-35,-14,-78],[-26,-43,-77],[-22,-40,-57],[-20,-21,-46]],"digitTipPositions":[[92,13,-94],[23,-23,-67],[10,-24,-58],[-5,-21,-53],[-20,-21,-46]]}




]
export { poses }
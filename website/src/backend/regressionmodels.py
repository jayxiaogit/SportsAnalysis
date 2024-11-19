# this file will be the center for all the regression models, and will create the lookup table
from processGrandSlam import *
from processGrandSlamPoints import *
from processPremier import *
from processPremierPoints import *
from processPremierMandatory import *
from processPremierMandatoryPoints import *
from processInternational import *
from processInternationalPoints import *

from Earnings125 import *
from Points125 import *
from Earnings100 import *
from Points100 import *
from Earnings10 import *
from Points10 import *
from Earnings15 import *
from Points15 import *
from Earnings25 import *
from Points25 import *
from Earnings40 import *
from Points40 import *
from Earnings50 import *
from Points50 import *
from Earnings60 import *
from Points60 import *
from Earnings75 import *
from Points75 import *
from Earnings80 import *
from Points80 import *
from EarningsUTR import *

# Level: [earnings][points]
predictor = {
    "GrandSlam": [[], []],
    "Premier": [[], []],
    "PremierMandatory": [[], []],
    "International": [[], []],
    "I125": [[], []],
    "I100": [[], []],
    "I10": [[], []],
    "I15": [[], []],
    "I25": [[], []],
    "I40": [[], []],
    "I50": [[], []],
    "I60": [[], []],
    "I75": [[], []],
    "I80": [[], []],
    "UTR": [[], []]
}

# this variable will determine how long the dictionary and later csv will be
scope = 1500
for ranking in range(1, scope):
    predictor[GrandSlam][0].append(GrandSlamEarnings(ranking))
    predictor[Premier][0].append(PremierEarnings(ranking))
    predictor[PremierMandatory][0].append(PMEarnings(ranking))
    predictor[International][0].append(InternationalEarnings(ranking))
    predictor[I125][0].append(Earnings125(ranking))
    predictor[GrandSlam][1].append(GrandSlamPoints(ranking))
    predictor[Premier][1].append(PremierPoints(ranking))
    predictor[PremierMandatory][1].append(PMPoints(ranking))
    predictor[International][1].append(InternationalPoints(ranking))
    predictor[I125][1].append(Points125(ranking))
    predictor[I10][0].append(Earnings10(ranking))
    predictor[I10][1].append(Points10(ranking))
    predictor[I15][0].append(Earnings15(ranking))
    predictor[I15][1].append(Points15(ranking))
    predictor[I25][0].append(Earnings25(ranking))
    predictor[I25][1].append(Points25(ranking))
    predictor[I40][0].append(Earnings40(ranking))
    predictor[I40][1].append(Points40(ranking))
    predictor[I50][0].append(Earnings50(ranking))
    predictor[I50][1].append(Points50(ranking))
    predictor[I60][0].append(Earnings60(ranking))
    predictor[I60][1].append(Points60(ranking))
    predictor[I75][0].append(Earnings75(ranking))
    predictor[I75][1].append(Points75(ranking))
    predictor[I80][0].append(Earnings75(ranking))
    predictor[I80][1].append(Points75(ranking))
    predictor[UTR][0].append(EarningsUTR(ranking))
    predictor[UTR][1].append(1) # UTR provides no pro points

# now create a csv using the dictionary
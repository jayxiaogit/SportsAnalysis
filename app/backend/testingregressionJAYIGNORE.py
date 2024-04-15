from processGrandSlam import *
from processGrandSlamPoints import *
from processPremier import *
from processPremierPoints import *
from processPremierMandatory import *
from processPremierMandatoryPoints import *
from processInternational import *
from processInternationalPoints import *

ranking = 38

print("GS", GrandSlamEarnings(ranking))
print("PM", PMEarnings(ranking))
print("P", PremierEarnings(ranking))
print("I", InternationalEarnings(ranking))

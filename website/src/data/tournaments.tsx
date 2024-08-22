type Tournament = {
    id: number
    name: string
    week: string
    type: string
  }

export const data: Tournament[] = [
    {'id': 0, 'name': 'Adelaide International 1', 'week': '1', 'type': '500'}, 
    {'id': 1, 'name': 'Workday Canberra International', 'week': '1', 'type': '125'}, 
    {'id': 2, 'name': 'W50 Nonthaburi', 'week': '1', 'type': '50'}, 
    {'id': 3, 'name': 'W34 Arcadia, CA', 'week': '1', 'type': '35'}, 
    {'id': 4, 'name': 'W15 Monstir (TUN)', 'week': '1', 'type': '15'}, 
    {'id': 5, 'name': 'Adelaide International 2', 'week': '2', 'type': '500'}, 
    {'id': 6, 'name': 'ASB Classic', 'week': '2', 'type': '250'}, 
    {'id': 7, 'name': 'Hobart International', 'week': '2', 'type': '250'}, 
    {'id': 8, 'name': 'W50 Nonthaburi', 'week': '2', 'type': '50'}, 
    {'id': 9, 'name': 'W35 Naples, FL', 'week': '2', 'type': '35'}, 
    {'id': 10, 'name': 'W35 Loughborough', 'week': '2', 'type': '35'},
    {'id': 11, 'name': 'W35 Antalya', 'week': '2', 'type': '35'}, 
    {'id': 12, 'name': 'W15 Fort-De-France', 'week': '2', 'type': '15'}, 
    {'id': 13, 'name': 'W15 Monastir', 'week': '2', 'type': '15'}, 
    {'id': 14, 'name': 'W15 Esch/Alzette', 'week': '2', 'type': '15'},
    {'id': 16, 'name': 'W50 Bengaluru', 'week': '3', 'type': '50'}, 
    {'id': 17, 'name': 'W50 Antalya', 'week': '3', 'type': '50'}, 
    {'id': 18, 'name': 'W35 Naples', 'week': '3', 'type': '35'}, 
    {'id': 19, 'name': 'W35 Monastir', 'week': '3', 'type': '35'}, 
    {'id': 20, 'name': 'W35 Petit-Bourg', 'week': '3', 'type': '35'}, 
    {'id': 21, 'name': 'W35 Sunderland', 'week': '3', 'type': '35'}, 
    {'id': 22, 'name': 'W35 Buenos Aires', 'week': '3', 'type': '35'}, 
    {'id': 15, 'name': 'Australian Open', 'week': '3, 4', 'type': 'GS'}, 
    {'id': 24, 'name': 'W75 Vero Beach', 'week': '4', 'type': '75'}, 
    {'id': 25, 'name': 'W75 Porto', 'week': '4', 'type': '75'}, 
    {'id': 26, 'name': 'W50 Pune', 'week': '4', 'type': '50'}, 
    {'id': 27, 'name': 'W35 Buenos Aires', 'week': '4', 'type': '35'}, 
    {'id': 28, 'name': 'W35 Monastir', 'week': '4', 'type': '35'}, 
    {'id': 29, 'name': 'W35 Le Gosier', 'week': '4', 'type': '35'}, 
    {'id': 30, 'name': 'W15 Antalya', 'week': '4', 'type': '15'}, 
    {'id': 31, 'name': 'Thailand Open', 'week': '5', 'type': '250'}, 
    {'id': 32, 'name': 'Open 6eSens-Metropole de Lyon', 'week': '5', 'type': '250'}, 
    {'id': 33, 'name': 'Mubadala Abu Dhabi Open', 'week': '6', 'type': '500'}, 
    {'id': 34, 'name': 'Upper Austria Ladies Linz', 'week': '6', 'type': '250'}, 
    {'id': 35, 'name': 'L&T Mumbai Open', 'week': '6', 'type': '125'}, 
    {'id': 36, 'name': 'Puerto Vallarta Open', 'week': '6', 'type': '125'}, 
    {'id': 37, 'name': 'Qatar TotalEnergies Open', 'week': '7', 'type': '500'}, 
    {'id': 38, 'name': 'Dubai Duty Free Tennis Championships', 'week': '8', 'type': '1000'}, 
    {'id': 39, 'name': 'Merida Open Akron', 'week': '8', 'type': '250'}, 
    {'id': 40, 'name': 'ATX Open', 'week': '9', 'type': '250'}, 
    {'id': 41, 'name': 'BNP Paribas Open', 'week': '10, 11', 'type': '1000'}, 
    {'id': 43, 'name': 'Fifth Third Charleston 125', 'week': '11', 'type': '125'}, 
    {'id': 44, 'name': 'Miami Open ', 'week': '12, 13', 'type': '1000'}, 
    {'id': 46, 'name': 'San Luis Open', 'week': '13', 'type': '125'}, 
    {'id': 47, 'name': 'Megasaray Hotels Open', 'week': '13', 'type': '125'}, 
    {'id': 48, 'name': 'Credit One Charleston Open', 'week': '14', 'type': '500'}, 
    {'id': 49, 'name': 'Copa Colsanitas', 'week': '14', 'type': '250'}, 
    {'id': 50, 'name': 'Open Internacional Femini Solgirones', 'week': '14', 'type': '125'},
    {'id': 51, 'name': 'Porsche Tennis Grand Prix', 'week': '16', 'type': '500'}, 
    {'id': 52, 'name': 'Oeiras Ladies Open', 'week': '16', 'type': '125'}, 
    {'id': 53, 'name': 'Mutua Madrid Open', 'week': '17, 18', 'type': '1000'}, 
    {'id': 55, 'name': 'Lopen 35 de Saint Malo', 'week': '18', 'type': '125'}, 
    {'id': 56, 'name': 'Catalonia Open WTA 125', 'week': '18', 'type': '125'}, 
    {'id': 57, 'name': "Internazionali BNL d'Italia", 'week': '19, 20', 'type': '1000'}, 
    {'id': 59, 'name': 'Parma Ladies Open', 'week': '20', 'type': '125'}, 
    {'id': 60, 'name': 'Trophee Clarins', 'week': '20', 'type': '125'}, 
    {'id': 61, 'name': 'Grand Prix Son Altesse Royale La Princesse Lalla Meryem', 'week': '21', 'type': '250'}, 
    {'id': 62, 'name': 'Internationaux de Strasbourg', 'week': '21', 'type': '250'}, 
    {'id': 63, 'name': 'Roland-Garros', 'week': '22, 23', 'type': 'GS'}, 
    {'id': 65, 'name': 'Open delle Puglie', 'week': '23', 'type': '125'}, 
    {'id': 66, 'name': 'Makarska Open', 'week': '23', 'type': '125'}, 
    {'id': 67, 'name': 'Rothesay Open', 'week': '24', 'type': '250'}, 
    {'id': 68, 'name': 'Libema Open', 'week': '24', 'type': '250'}, 
    {'id': 69, 'name': 'BBVA Open Internacional de Valencia', 'week': '24', 'type': '125'}, 
    {'id': 70, 'name': 'bett1open', 'week': '25', 'type': '500'}, 
    {'id': 71, 'name': 'Rothesay Classic', 'week': '25', 'type': '250'}, 
    {'id': 72, 'name': 'Veneto Open', 'week': '25', 'type': '125'}, 
    {'id': 73, 'name': 'Rothesay International', 'week': '26', 'type': '500'}, 
    {'id': 74, 'name': 'Bad Homburg Open', 'week': '26', 'type': '250'}, 
    {'id': 75, 'name': 'The Championships', 'week': '27, 28', 'type': 'GS'}, 
    {'id': 77, 'name': 'Nordea Open', 'week': '28', 'type': '125'}, 
    {'id': 78, 'name': 'Grand Est Open 88', 'week': '28', 'type': '125'}, 
    {'id': 79, 'name': 'Hungarian Grand Prix', 'week': '29', 'type': '250'}, 
    {'id': 80, 'name': '34 Palermo Ladies Open', 'week': '29', 'type': '250'}, 
    {'id': 81, 'name': 'BCR lasi Open', 'week': '29', 'type': '125'}, 
    {'id': 82, 'name': 'Hamburg European Open', 'week': '30', 'type': '250'}, 
    {'id': 83, 'name': 'Ladies Open Lausanne', 'week': '30', 'type': '250'}, 
    {'id': 84, 'name': 'BNP Paribas Poland Open', 'week': '30', 'type': '250'}, 
    {'id': 85, 'name': 'Polish Open', 'week': '30', 'type': '125'}, 
    {'id': 86, 'name': 'Mubadala Citi DC Open', 'week': '31', 'type': '500'}, 
    {'id': 87, 'name': 'Livesport Prague Open', 'week': '31', 'type': '250'}, 
    {'id': 88, 'name': 'Omnium Banque National', 'week': '32', 'type': '1000'}, 
    {'id': 89, 'name': 'Western & Southern Open', 'week': '33', 'type': '1000'}, 
    {'id': 90, 'name': 'Barranquila Open', 'week': '33', 'type': '125'}, 
    {'id': 91, 'name': 'Abierto GNP Seguros', 'week': '34', 'type': '250'}, 
    {'id': 92, 'name': 'Tennis in the Land', 'week': '34', 'type': '250'}, 
    {'id': 93, 'name': 'US Open', 'week': '35, 36', 'type': 'GS'}, 
    {'id': 95, 'name': 'San Diego Open', 'week': '37', 'type': '500'}, 
    {'id': 96, 'name': 'Kinoshita Group Japan Open Tennis Championships', 'week': '37', 'type': '250'}, 
    {'id': 97, 'name': 'Guadalajara Open Akron', 'week': '38', 'type': '1000'}, 
    {'id': 98, 'name': 'Galaxy Holding Group - Guangzhou Open', 'week': '38', 'type': '250'},
    {'id': 99, 'name': 'Toray Pan Pacific Open Tennis', 'week': '39', 'type': '500'}, 
    {'id': 100, 'name': 'Ningbo Open', 'week': '39', 'type': '250'}, 
    {'id': 101, 'name': 'China Open', 'week': '40', 'type': '1000'}, 
    {'id': 102, 'name': 'Zhengzhou Open', 'week': '41', 'type': '500'}, 
    {'id': 103, 'name': 'Prudential Hong Kong Tennis Open', 'week': '41', 'type': '250'}, 
    {'id': 104, 'name': 'Hana Bank Korea Open', 'week': '41', 'type': '250'}, 
    {'id': 105, 'name': 'Transylvania Open', 'week': '42', 'type': '250'}, 
    {'id': 106, 'name': 'Jasmin Open Monastir', 'week': '42', 'type': '250'}, 
    {'id': 107, 'name': 'Jiangxi Open', 'week': '42', 'type': '250'}
]
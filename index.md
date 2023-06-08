---
layout: page-with-side-nav
title: Features
---

# {{ site.apiname }} Web API Features

De {{ site.apiname }} Web API maakt het mogelijk om gegevens van actuele personen in de basisregistratie personen (BRP) te raadplegen. De personen worden opgezocht op basis van hun identificerende gegevens.

In de BRP worden personen uniek geïdentificeerd met behulp van hun burgerservicenummer. Is het burgerservicenummer van de te raadplegen persoon/personen bekend, dan moet de [Raadpleeg persoon met burgerservicenummer](#raadplegen-van-personen) operatie worden gebruikt om de betreffende persoon/personen te raadplegen.

Is het burgerservicenummer van de te raadplegen persoon/personen niet bekend, dan kan deze worden opgezocht met behulp van de [Zoek persoon](#zoeken-van-personen) operaties.

## Algemene Verordening Gegevensbescherming (AVG)

De BRP bevragen API is ontworpen conform de REST principes. Om ook aan de AVG te conformeren zijn er concessies gedaan met betrekking tot het toepassen van de REST principes. De belangrijkste concessie is dat de POST methode en niet de GET methode wordt gebruikt om personen te bevragen. Dit zorgt er voor dat er geen [persoonlijk identificeerbare informatie (PII)](https://piwikpro.nl/blog/pii-niet-pii-en-persoonsgegevens/) terecht komen in de url van een request en daardoor ook niet in server logs.

## Zoeken van personen

De volgende zoek operaties kunnen worden gebruikt om een persoon met niet-uniek identificerende persoonsgegevens te vinden:

- zoek met geslachtsnaam en geboortedatum
  - [overzicht](./features/zoek-met-geslachtsnaam-en-geboortedatum/overzicht.feature)
  - [fout cases](./features/zoek-met-geslachtsnaam-en-geboortedatum/fout-cases.feature)
- zoek met geslachtsnaam, voornamen en gemeente van inschrijving
  - [overzicht](./features/zoek-met-geslachtsnaam-voornamen-en-gemeente-van-inschrijving/overzicht.feature)
  - [fout cases](./features/zoek-met-geslachtsnaam-voornamen-en-gemeente-van-inschrijving/fout-cases.feature)
- zoek met postcode en huisnummer
  - [overzicht](./features/zoek-met-postcode-en-huisnummer/overzicht.feature)
  - [fout cases](./features/zoek-met-postcode-en-huisnummer/fout-cases.feature)
- zoek met straat, huisnummer en gemeente van inschrijving
  - [overzicht](./features/zoek-met-straatnaam-huisnummer-en-gemeente-van-inschrijving/overzicht.feature)
  - [fout cases](./features/zoek-met-straatnaam-huisnummer-en-gemeente-van-inschrijving/fout-cases.feature)
- zoek met nummeraanduiding identificatie
  - [overzicht](./features/zoek-met-nummeraanduiding-identificatie/overzicht.feature)
  - [fout cases](./features/zoek-met-nummeraanduiding-identificatie/fout-cases.feature)

Het resultaat van deze operaties is een PersoonBeperkt collectie/lijst. Standaard bevat deze lijst alleen personen die in leven zijn. Om een overleden persoon te zoeken, moet de inclusiefOverledenPersonen parameter op true worden gezet. 

Voor overleden personen wordt altijd het opschortingBijhouding veld geleverd met reden code 'O' en omschrijving 'overlijden'. Zie de [overlijden overzicht](./features/persoon-beperkt/overlijden/overzicht.feature) feature voor meer informatie over dit veld.

## Raadplegen van personen

Als de burgerservicenummer van de te bevragen personen wel bekend is, kan de volgende operatie worden gebruikt om gegevens van de persoon te raadplegen:

- raadpleeg met burgerservicenummer
  - [overzicht](./features/raadpleeg-met-burgerservicenummer/overzicht.feature)
  - [fout cases](./features/raadpleeg-met-burgerservicenummer/fout-cases.feature)

Het resultaat van deze operatie is een Persoon collectie/lijst.

Voor overleden personen wordt altijd het opschortingBijhouding veld geleverd met reden code 'O' en omschrijving 'overlijden'.  Zie de [overlijden overzicht](./features/persoon/overlijden/overzicht.feature) feature voor meer informatie over dit veld.

## Filteren van de velden van de gevonden personen

Bij elke bevraging moet de fields parameter verplicht worden gebruikt om aan te geven welke velden van de gevonden persoon/personen geleverd moet worden. Om de privacy van de gevraagde personen te beschermen mag een afnemer alleen de velden vragen waarvoor hij doelbinding heeft en moet de gevraagde velden worden beperkt tot wat nodig is voor de uit te voeren taak.
Bijkomend voordeel van deze data minimalisatie is dat er ook wordt bijgedragen aan verduurzaming. Hoe minder velden er worden gevraagd, hoe minder de server en het netwerk worden belast.

Een veld wordt gevraagd door het volledig pad van het betreffende veld op te geven in de fields parameter. Het volledig pad van een veld is de samenvoeging van de naam van het veld en de namen van zijn 'ouder' velden met een '.' karakter tussen de veld namen. Voorbeelden van volledige paden:

- geboorte.datum (volledig pad van het geboortedatum veld van een persoon)
- kinderen.naam.voornamen (volledig pad van het voornamen veld van de kinderen van een persoon)

Zie de [fields](./features/fields.feature) en de [fields fout cases](./features/fields-fout-cases.feature) feature bestanden voor meer informatie en voorbeelden over het gebruik van veld paden en de fields parameter. 

### Stel fields samen in enkele eenvoudige klikken

<style>
      .check-tree li {
        list-style-type: none
      }

      #fields {
        width: 80%;
      }

      .hidden {
        display: none;
      }

      .toggleButton {
        background-color: darkgray;
        color: white;
        border-radius: 50%;
        border-style: none;
        font-weight: 800;
        cursor: pointer;
      }

      .toggleButton:hover {
        background-color: black;
      }
    </style>
    
    #### 1. Selecteer het zoektype

    <select id="searchType" onchange="loadFieldsList()">
      <option value="Persoon">RaadpleegMetBurgerservicenummer</option>
      <option value="PersoonBeperkt">ZoekMetGeslachtsnaamEnGeboortedatum</option>
      <option value="PersoonBeperkt">ZoekMetNaamEnGemeenteVanInschrijving</option>
      <option value="PersoonBeperkt">ZoekMetPostcodeEnHuisnummer</option>
      <option value="PersoonBeperkt">ZoekMetStraatHuisnummerEnGemeenteVanInschrijving</option>
      <option value="PersoonBeperkt">ZoekMetNummeraanduidingIdentificatie</option>
    </select>

    #### 2. Selecteer de velden die je wilt ontvangen

    <div id="selectors"></div>

    #### 3. Kopieer de fields hieronder en gebruik deze in je aanroep

    <textarea id="fields"></textarea>

    <script>
      loadFieldsList();

      function loadFieldsList() {
        document.getElementById("fields").value = "";
        
        var responseObjectName = document.getElementById("searchType").value;

        var ajaxRequest = new XMLHttpRequest();
        ajaxRequest.onreadystatechange = function(){
          if(ajaxRequest.readyState == 4){
            if(ajaxRequest.status == 200){
              renderFieldSelectors(responseObjectName, ajaxRequest.responseText.split(/\r?\n/))
            } else {
              document.getElementById("selectors").innerHTML = "Status error: " + ajaxRequest.status;
            }
          }
        }

        ajaxRequest.open("GET", "https://raw.githubusercontent.com/BRP-API/Haal-Centraal-BRP-bevragen/master/features/fields-filtered-" + responseObjectName + ".csv", true);
        ajaxRequest.send();
      }

      function renderFieldSelectors(responseObjectName, fieldsList) {
        fieldsList.shift(); // kolomkop overslaan

        var selectors = document.getElementById("selectors");
        selectors.innerHTML = '<ul id="fields-tree" class="check-tree"></ul>';
        addTreeItem(fieldsList);
        hideUselessToggleButtons();
      }

      function addTreeItem(fieldsList) {
        if (fieldsList.length == 0) { return; }

        var field = fieldsList.shift();
        if (field=="") { addTreeItem(fieldsList); return; }

        var parent = document.getElementById("fields-tree");
        if (field.split('.').length > 1) { parent = document.getElementById(field.split('.').slice(0, -1).join('.') + '-list'); }

        li = document.createElement('li');
        li.innerHTML = `<input type="checkbox" id="${field}" onchange="click_item(this)"/>`;
        li.innerHTML += field.split('.').slice(-1);
        li.innerHTML += ` <button id="${field}-toggle" onclick="toggleGroupFields('${field}')" class="toggleButton">+</button>`;
        li.innerHTML += `<ul id="${field}-list" class="hidden"></ul>`;
        parent.appendChild(li);

        addTreeItem(fieldsList);
      }

      function hideUselessToggleButtons() {
        for (element of document.getElementById("fields-tree").getElementsByTagName("li")) {
          var id = element.getElementsByTagName("input")[0].id;
          if (document.getElementById(id + '-list').children.length == 0) {
            document.getElementById(id + '-toggle').classList.add("hidden");
          }
        }
      }

      function click_item(item) {
        setChildren(item);
        setParent(item);
        setFields();
      }

      function setChildren(item) {
        if (document.getElementById(item.id + "-list").children.length > 0)
        {
          for (child of document.getElementById(item.id + "-list").children) {
            child.getElementsByTagName("input")[0].checked = item.checked;
            child.getElementsByTagName("input")[0].indeterminate = false;
            setChildren(child.getElementsByTagName("input")[0])
          }
        }
      }

      function setParent(item) {
        if (item.id.split('.').length < 2) { return; }

        parentId = item.id.split('.').slice(0, -1).join('.');
        parent = document.getElementById(parentId);

        determineCheckStatus(parent);

        setParent(parent);
      }

      function determineCheckStatus(item) {
        var checked = 0;
        var notChecked = 0;

        for (child of document.getElementById(item.id + "-list").children) {
          if (child.getElementsByTagName("input")[0].checked == true) { 
            checked += 1; 
          } else if ( child.getElementsByTagName("input")[0].indeterminate == true) {
            checked += 1;
            notChecked += 1;
          } else {
            notChecked += 1;
          }
        }

        if (checked > 0 && notChecked == 0) {
          item.checked = true;
          item.indeterminate = false;
          return;
        }
        if (checked > 0 && notChecked > 0) {
          item.checked = false;
          item.indeterminate = true;
          return;
        }

        // checked == 0;
        item.checked = false;
        item.indeterminate = false;
      }

      function setFields() {
        fields = [];

        elements = document.getElementById("fields-tree").getElementsByTagName("input");
        for (element of elements) {
          if (element.id.split('.').length > 1) {
            parentId = element.id.split('.').slice(0, -1).join('.');
            if (document.getElementById(parentId).checked == true) { continue; }
          }
          
          if (element.checked == true) { fields.push(element.id); }
        };

        document.getElementById("fields").value = JSON.stringify(fields);
      }

      function toggleGroupFields(group) {
        var list = document.getElementById(group + '-list');
        var toggleButton = document.getElementById(group + '-toggle');
        if (list.classList.contains('hidden')) {
          list.classList.remove('hidden');
          toggleButton.innerHTML = '-';
        } else {
          list.classList.add('hidden');
          toggleButton.innerHTML = '+';
        }
      }
    </script>

### Filteren van datum en waardetabel velden

De {{ site.apiname }} Web API kent de volgende datum types:

- VolledigeDatum
- DatumOnbekend
- JaarDatum
- JaarMaandDatum

en de volgende waardetabel types:

- Waardetabel
- AdellijkeTitelPredicaatType

Bij het vragen van één of meerdere velden van deze types wordt altijd alle velden van het gevraagde type geleverd. In de [fields](./features/fields.feature) feature bestand zijn onder de volgende rules voorbeelden hiervan opgenomen:

- [Rule: Het vragen van één of meerdere velden van een 'waardetabel' veld levert alle velden van de 'waardetabel' veld](./features/fields.feature#rule-het-vragen-van-één-of-meerdere-velden-van-een-waardetabel-veld-levert-alle-velden-van-de-waardetabel-veld)
- [Rule: Het vragen van één of meerdere velden van een 'datum' veld levert alle velden van de 'datum' veld](./features/fields.feature#rule-het-vragen-van-één-of-meerdere-velden-van-een-datum-veld-levert-alle-velden-van-de-datum-veld)

### Standaard geleverde velden

De volgende velden worden automatisch geleverd, als de bijbehorende situatie van toepassing is:

- geheimhoudingPersoonsgegevens
- inOnderzoek
- opschortingBijhouding
- rni
- verificatie

Automatisch geleverde velden mogen niet worden gevraagd met de fields parameter.

### Filteren van verblijfplaats velden

Voor verblijfplaats zijn er twee autorisatie profielen:

- geautoriseerd voor zowel verblijfplaats binnenland (Adres en Locatie) en verblijfplaats buitenland gegevens
- geautoriseerd voor alleen verblijfplaats binnenland (Adres en Locatie) gegevens

Afnemers die geautoriseerd zijn voor alleen verblijfplaats binnenland gegevens kunnen hierdoor de standaard veld paden van verblijfplaats niet gebruiken om alleen verblijfplaats binnenland velden te vragen. Met deze veld paden worden namelijk zowel verblijfplaats binnenland als verblijfplaats buitenland gevraagd.

Afnemers die niet geautoriseerd zijn voor verblijfplaats buitenland gegevens moeten daarom de __verblijfplaatsBinnenland__ fields alias gebruiken om aan te geven dat alleen verblijfplaats binnenland gegevens wordt gevraagd.

Het gebruik van de __verblijfplaatsBinnenland__ fields alias is beschreven in de volgende feature bestanden:

- [verblijfplaats fields alias](./features/persoon/verblijfplaats/fields-alias.feature)
- [verblijfplaats fields alias fout cases](./features/persoon/verblijfplaats/fields-alias-fout-cases.feature)

### Filteren van adresregels velden

De adresregel velden van een persoon wordt samengesteld uit de verblijfplaats velden van een persoon. Om de adresregel velden te kunnen vragen moet de afnemer daarom minimaal geautoriseerd zijn voor de verblijfplaats velden waarmee de adresregel velden worden samengesteld.

Dit betekent dat de twee autorisatie profielen van verblijfplaats ook gelden voor het vragen van adresregel velden. Afnemers die niet geautoriseerd zijn voor het vragen van adresregels van een verblijfplaats buitenland moeten daarom de __adresseringBinnenland__ fields alias gebruiken om aan te geven dat alleen adresregels voor verblijfplaats binnenland wordt gevraagd.

Het gebruik van de __adresseringBinnenland__ fields alias is beschreven in de volgende feature bestanden:

- [adresregels fields alias](./features/persoon/adressering/adres-regels/fields-alias.feature)
- [adresregels fields alias fout cases](./features/persoon/adressering/adres-regels/fields-alias-fout-cases.feature)

### Filteren van partner velden

Bij het vragen van de partners van een persoon wordt de gevraagde gegevens van actuele partners (= niet ontbonden huwelijk/geregistreerd partnerschap) geleverd. Heeft de betreffende persoon alleen ontbonden huwelijk/geregistreerd partnerschappen, dan wordt alleen de gevraagde gegevens van het meest recente ontbonden huwelijk/geregistreerd partnerschap geleverd.

In het volgend feature bestand zijn de bovenstaande regels geïllustreerd aan de hand van scenario's/voorbeelden:

- [partner velden vragen met fields](./features/persoon/partner/overzicht.feature)

### Filteren van nationaliteit velden

De {{ site.apiname }} Web API kent de volgende nationaliteit types:

- Nationaliteit
- Staatloos
- BehandeldAlsNederlander
- VastgesteldNietNederlander
- Onbekend

Er wordt alleen gegevens van actuele (= niet beëindigde) nationaliteiten geleverd.

In het volgend feature bestand zijn de bovenstaande regels geïllustreerd aan de hand van scenario's/voorbeelden:

- [nationaliteit velden vragen met fields](./features/persoon/nationaliteit/overzicht.feature)

### Filteren van verblijfstitel velden

Wanneer velden van de verblijfstitel wordt gevraagd, dan wordt de gevraagde gegevens geleverd als de verblijfstitel niet is beëindigd. Gegevens van een verblijfstitel wordt ook niet geleverd als de aanduiding gelijk is aan 'geen verblijfstitel (meer)'.

In het volgend feature bestand zijn de bovenstaande regels geïllustreerd aan de hand van scenario's/voorbeelden:

- [verblijfstitel velden vragen met fields](./features/persoon/verblijfstitel/overzicht.feature)

## Eén of meerdere gevraagde velden zijn in onderzoek

Om een afnemer te notificeren dat één of meerdere gevraagde velden in onderzoek zijn, worden de bijbehorende inOnderzoek en datumIngangOnderzoek velden ook geleverd.
Wanneer één of meerdere velden waaruit een andere veld wordt afgeleid (bijv. de adressering velden) in onderzoek zijn, dan is het afgeleid veld ook in onderzoek en wordt de inOnderzoek veld van het afgeleid veld ook geleverd.
In het [in onderzoek](./features/in-onderzoek.feature) feature bestand zijn de regels beschreven wanneer de inOnderzoek velden wel/niet worden geleverd.

## Geen/null/false waarde, leeg object waarde en standaard waarde

Om de payload van een response klein te houden, is er voor gekozen om velden met de volgende waarden niet te leveren in de response:

- niet gevraagde velden. Deze velden hebben _null_ als waarde.
- gevraagde velden die de gevraagde persoon niet heeft. Deze velden hebben _null_ als waarde. Voorbeeld: naam.voorvoegsel veld wordt gevraagd voor een persoon die geen voorvoegsel in zijn naam heeft.
- gevraagde velden hebben de _false_ waarde. Voorbeeld: indicatieCurateleRegister veld wordt gevraagd voor een persoon die niet onder curatele is gesteld.
- gevraagde velden is een groep velden die de persoon niet heeft. Voorbeeld: verblijfstitel velden wordt gevraagd voor een persoon die geen verblijfstitel heeft
- gevraagde velden heeft de __standaard__ waarde. In de BRP wordt de standaard waarde gebruikt om aan te geven dat een gegeven onbekend is. Voorbeeld: geboorte.plaats veld wordt gevraagd voor een persoon waarvan de geboorteplaats onbekend is
- gevraagde velden hebben geen aanduiding in onderzoek.

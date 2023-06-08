---
layout: page-with-side-nav
title: fields
---

# Fields samenstellen

<script>console.log('test')</script>

## 1. selecteer het zoektype

<select id="searchType" onchange="loadFieldsList()">
  <option value="Persoon">RaadpleegMetBurgerservicenummer</option>
  <option value="PersoonBeperkt">ZoekMetGeslachtsnaamEnGeboortedatum</option>
  <option value="PersoonBeperkt">ZoekMetNaamEnGemeenteVanInschrijving</option>
  <option value="PersoonBeperkt">ZoekMetPostcodeEnHuisnummer</option>
  <option value="PersoonBeperkt">ZoekMetStraatHuisnummerEnGemeenteVanInschrijving</option>
  <option value="PersoonBeperkt">ZoekMetNummeraanduidingIdentificatie</option>
</select>

## 2. selecteer de velden die je wilt ontvangen

<div id="selectors"></div>

## 3. Kopieer de volgende fields en gebruik dit in je request bij de fields parameter

<textarea id="fields"></textarea>

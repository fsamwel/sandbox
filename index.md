---
layout: page-with-side-nav
title: fields
---

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

# Fields samenstellen


<script src="https://raw.githubusercontent.com/fsamwel/sandbox/gh-pages/fields.js" />

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

<script>loadFieldsList();</script>

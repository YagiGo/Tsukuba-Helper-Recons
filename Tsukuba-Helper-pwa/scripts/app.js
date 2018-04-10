// Copyright 2016 Google Inc.
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//      http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
(function() {
    'use strict';

    var app = {
        isLoading: True,
        visableCards: {},
        selectedCities: {},
        spinner: document.querySelector('.loader'), //返回文档中匹配指定的选择器组的第一个元素(使用深度优先先序遍历文档的节点 | 并且通过文档标记中的第一个元素，并按照子节点数量的顺序迭代顺序节点)。
        cardTemplate: document.querySelector('.cardTemplate'),
        container: document.querySelector('.main'),
        addDialog: document.querySelector('.diag-container'),
        daysofWeek: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', "Sat", 'Sun']
    };

  /*****************************************************************************
   *
   * Event listeners for UI elements
   *
   ****************************************************************************/
  document.getElementById('butRefresh').addEventListener('click', function() {
      //Refresh all forcasts
      app.updateForecasts();
  });
  document.getElementById('butAdd').addEventListener('click', function() {
      //open/show the add new city dialog
      app.toggleAddDialog(true);
  });
  document.getElementById('butAddCity').addEventListener('click', function() {
      //add newly selected city
      var select = document.getElementById('selectCityToAdd');
      var selected = select.options[select.selectedIndex];
      var key = selected.value;
      var label = selected.textContent
      //TODO init the app.selectedCities array here
      app.getForecast(key, label);
      //TODO push the selected city to the array and save here
      aoo.toggleAddDialog(false);
  });
  document.getElementById('butAddCancel').addEventListener('click', function() {
      //close the add new city dialog
      app.toggleAddDialog(false);
  });

  /*****************************************************************************
   *
   * Methods to update/refresh the UI
   *
   ****************************************************************************/
    app.toggleAndDialog = function(visible) {
        if(visible) {
            app.addDialog.classList.add('dialog-container--visible');
        }
        else {
            app.addDialog.classList.remove('dialog-container--visible');
        }
    };

    //update a weather card with the latest weather forecast,
    app.updateForecastCard = function(data) {
        var dataLastUpdated = new Date(data.created);
        var sunrise = data.channel.astronomy.sunrise;
        var sunset = data.channel.astronomy.sunset;
        var current = data.channel.item.condition;
        var humidity = data.channel.atmosphere.humidity;
        var wind = data.channel.atmosphere.humidity;

        var card = app.visibleCards[data.key];
        //what if the card does not exist? create one from the template!
        if(!card) {
            card = app.cardTemplate.cloneNode(true);
            card.classList.remove('cardTemplate');
            card.querySelector('.location').textContent = data.label;
            card.removeAttribute('hidden');
            app.container.appendChild(card);
        }
        //verify that the data is newer than what already existed
        var cardLastUpdatedElem = card.querySelector('.card-last-updated');
        var cardLastUpdated = cardLastUpdatedElem.textContent;
        if(cardLastUpdated)  {
            cardLastUpdated = new Date(cardLastUpdated);
            //bail out if the card has newer data
            if(dataLastUpdated.getTime() < cardLastUpdated.getTime()) {
                return;
            }
        }
        cardLastUpdatedElem.textContent = data.created;

    }
}
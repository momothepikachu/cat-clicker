let model = {
	currentCat: ['Fluffy', 0, 'https://s26.postimg.cc/z0zsukx6x/Fluffy.jpg'],
	cats: {
		Fluffy: ['Fluffy', 0, 'https://s26.postimg.cc/z0zsukx6x/Fluffy.jpg'],
		Jumpy: ['Jumpy', 0, 'https://s26.postimg.cc/cp2016qd5/Jumpy.jpg'],
		Tom: ['Tom', 0, 'https://s26.postimg.cc/5ylirrimx/Tom.jpg']
	}
};

let octopus = {
	init: function () {
		view.init();
	},
	// Find the corresponding cat by name and click it n times
	catCount: function (name, n) {
		model.cats[name][1] += n;
		return model.cats[name][1];
	},
	getCats: function () {
		return model.cats;
	},
	setCurrentCat: function (cat) {
		model.currentCat = octopus.getCats()[cat];
	},
	getCurrentCat: function () {
		return model.currentCat;
	},
	saveContent: function (cat) {
		let catInfo = model.currentCat;
		let newCatName = document.querySelector('input[name=\'Name\']').value;
		catInfo[0] = newCatName;
		catInfo[2] = document.querySelector('input[name=\'ImgURL\']').value;
		catInfo[1] = Number(document.querySelector('input[name=\'#Clicks\']').value);
		delete model.cats[cat];
		model.cats[newCatName] = catInfo;
		view.renderList();
		view.catList.value = newCatName;
		view.catList.dispatchEvent(new Event('change'));
		view.adminButton.click();
	}
};

let view = {
	init: function () {
		this.catList = document.querySelector('select');
		this.count = document.querySelector('.count');
		this.img = document.querySelector('img');
		this.name = document.querySelector('.name');
		this.adminButton = document.querySelector('button.admin');
		this.form = document.querySelector('.form');
		this.saveButton = document.querySelector('.save');
		this.cancelButton = document.querySelector('.cancel');
		this.renderList();
		this.renderImg();
		this.renderCount();
		this.toggleAdmin();
		this.formContent();
		this.submitForm();
		this.cancelForm();
	},
	renderList: function () {
		let cats = octopus.getCats();
		this.catList.innerHTML = '';
		// Build selection of cats in the dropdown menu
		for (const i in cats) {
			let option = document.createElement('option');
			option.textContent = cats[i][0];
			this.catList.appendChild(option);
		}
	},
	renderImg: function () {
		// Change cat image according to your selection
		this.catList.addEventListener('change', function (e) {
			let catName = e.target.value;
			console.log(catName);
			octopus.setCurrentCat(catName);
			console.log(octopus.getCurrentCat());
			view.formContent();
			view.img.src = octopus.getCurrentCat()[2];
			view.name.textContent = catName;
			view.count.textContent = octopus.catCount(catName, 0);
		}, false);
	},
	renderCount: function () {
		// Count the number of clicks unique to each cat
		view.img.addEventListener('click', function () {
			//get the name of img
			let selected = octopus.getCurrentCat()[0];
			view.count.textContent = octopus.catCount(selected, 1);
		}, false);
	},
	toggleAdmin: function () {
		this.adminButton.addEventListener('click', function () {
			view.form.classList.toggle('hidden');
			view.formContent();
		});
	},
	formContent: function () {
		document.querySelector('input[name=\'Name\']').value = octopus.getCurrentCat()[0];
		document.querySelector('input[name=\'ImgURL\']').value = octopus.getCurrentCat()[2];
		document.querySelector('input[name=\'#Clicks\']').value = octopus.getCurrentCat()[1];
	},
	submitForm: function () {
		this.saveButton.addEventListener('click', function () {
			let catName = octopus.getCurrentCat()[0];
			octopus.saveContent(catName);
		});
	},
	cancelForm: function () {
		this.cancelButton.addEventListener('click', function () {
			view.form.classList.toggle('hidden');
		});
	}
};
octopus.init();
// let names = ['Fluffy', 'Jumpy', 'Tom'];
// let counts = [0, 0, 0];
// let img = document.querySelector('img');
// let name = document.querySelector('.name');

// // Find the corresponding cat by name and click it n times
// function catCount(name, n) {
// 	let index = names.indexOf(name);
// 	counts[index] += n;
// 	document.querySelector('.count').textContent = counts[index];
// }

// // Build selection of cats in the dropdown menu
// for (let i=0; i<names.length; i++){
// 	let option = document.createElement('option');
// 	option.textContent = names[i];
// 	document.querySelector('select').appendChild(option);
// }

// // Change cat image according to your selection
// document.querySelector('select').addEventListener('change', function(e){
// 	let catName = e.target.value;
// 	let src = 'img/'+catName+'.jpg';	
// 	img.src = src;
// 	name.textContent = catName;
// 	catCount(catName, 0);
// }
// 	, false);

// // Count the number of clicks unique to each cat
// document.querySelector('img').addEventListener('click', function(e){
// 	let selected = e.target.src.split('/').pop().split('.')[0];
// 	catCount(selected, 1);
// }, false);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsibW9kZWwiLCJjdXJyZW50Q2F0IiwiY2F0cyIsIkZsdWZmeSIsIkp1bXB5IiwiVG9tIiwib2N0b3B1cyIsImluaXQiLCJ2aWV3IiwiY2F0Q291bnQiLCJuYW1lIiwibiIsImdldENhdHMiLCJzZXRDdXJyZW50Q2F0IiwiY2F0IiwiZ2V0Q3VycmVudENhdCIsInNhdmVDb250ZW50IiwiY2F0SW5mbyIsIm5ld0NhdE5hbWUiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJ2YWx1ZSIsIk51bWJlciIsInJlbmRlckxpc3QiLCJjYXRMaXN0IiwiZGlzcGF0Y2hFdmVudCIsIkV2ZW50IiwiYWRtaW5CdXR0b24iLCJjbGljayIsImNvdW50IiwiaW1nIiwiZm9ybSIsInNhdmVCdXR0b24iLCJjYW5jZWxCdXR0b24iLCJyZW5kZXJJbWciLCJyZW5kZXJDb3VudCIsInRvZ2dsZUFkbWluIiwiZm9ybUNvbnRlbnQiLCJzdWJtaXRGb3JtIiwiY2FuY2VsRm9ybSIsImlubmVySFRNTCIsImkiLCJvcHRpb24iLCJjcmVhdGVFbGVtZW50IiwidGV4dENvbnRlbnQiLCJhcHBlbmRDaGlsZCIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwiY2F0TmFtZSIsInRhcmdldCIsImNvbnNvbGUiLCJsb2ciLCJzcmMiLCJzZWxlY3RlZCIsImNsYXNzTGlzdCIsInRvZ2dsZSJdLCJtYXBwaW5ncyI6IkFBQUEsSUFBSUEsUUFBUTtBQUNYQyxhQUFZLENBQUMsUUFBRCxFQUFXLENBQVgsRUFBYyw2Q0FBZCxDQUREO0FBRVhDLE9BQU07QUFDTEMsVUFBUSxDQUFDLFFBQUQsRUFBVyxDQUFYLEVBQWMsNkNBQWQsQ0FESDtBQUVMQyxTQUFPLENBQUMsT0FBRCxFQUFVLENBQVYsRUFBWSw0Q0FBWixDQUZGO0FBR0xDLE9BQUssQ0FBQyxLQUFELEVBQVEsQ0FBUixFQUFVLDBDQUFWO0FBSEE7QUFGSyxDQUFaOztBQVNBLElBQUlDLFVBQVU7QUFDYkMsT0FBTSxZQUFVO0FBQ2ZDLE9BQUtELElBQUw7QUFDQSxFQUhZO0FBSWI7QUFDQUUsV0FBVSxVQUFTQyxJQUFULEVBQWVDLENBQWYsRUFBa0I7QUFDM0JYLFFBQU1FLElBQU4sQ0FBV1EsSUFBWCxFQUFpQixDQUFqQixLQUF1QkMsQ0FBdkI7QUFDQSxTQUFPWCxNQUFNRSxJQUFOLENBQVdRLElBQVgsRUFBaUIsQ0FBakIsQ0FBUDtBQUNBLEVBUlk7QUFTYkUsVUFBUyxZQUFVO0FBQ2xCLFNBQU9aLE1BQU1FLElBQWI7QUFDQSxFQVhZO0FBWWJXLGdCQUFlLFVBQVNDLEdBQVQsRUFBYTtBQUMzQmQsUUFBTUMsVUFBTixHQUFtQkssUUFBUU0sT0FBUixHQUFrQkUsR0FBbEIsQ0FBbkI7QUFDQSxFQWRZO0FBZWJDLGdCQUFlLFlBQVU7QUFDeEIsU0FBT2YsTUFBTUMsVUFBYjtBQUNBLEVBakJZO0FBa0JiZSxjQUFhLFVBQVNGLEdBQVQsRUFBYTtBQUN6QixNQUFJRyxVQUFVakIsTUFBTUMsVUFBcEI7QUFDQSxNQUFJaUIsYUFBYUMsU0FBU0MsYUFBVCxDQUF1QixzQkFBdkIsRUFBK0NDLEtBQWhFO0FBQ0FKLFVBQVEsQ0FBUixJQUFhQyxVQUFiO0FBQ0FELFVBQVEsQ0FBUixJQUFhRSxTQUFTQyxhQUFULENBQXVCLHdCQUF2QixFQUFpREMsS0FBOUQ7QUFDQUosVUFBUSxDQUFSLElBQWFLLE9BQU9ILFNBQVNDLGFBQVQsQ0FBdUIseUJBQXZCLEVBQWtEQyxLQUF6RCxDQUFiO0FBQ0EsU0FBT3JCLE1BQU1FLElBQU4sQ0FBV1ksR0FBWCxDQUFQO0FBQ0FkLFFBQU1FLElBQU4sQ0FBV2dCLFVBQVgsSUFBeUJELE9BQXpCO0FBQ0FULE9BQUtlLFVBQUw7QUFDQWYsT0FBS2dCLE9BQUwsQ0FBYUgsS0FBYixHQUFxQkgsVUFBckI7QUFDQVYsT0FBS2dCLE9BQUwsQ0FBYUMsYUFBYixDQUEyQixJQUFJQyxLQUFKLENBQVUsUUFBVixDQUEzQjtBQUNBbEIsT0FBS21CLFdBQUwsQ0FBaUJDLEtBQWpCO0FBQ0E7QUE5QlksQ0FBZDs7QUFpQ0EsSUFBSXBCLE9BQU87QUFDVkQsT0FBTSxZQUFVO0FBQ2YsT0FBS2lCLE9BQUwsR0FBZUwsU0FBU0MsYUFBVCxDQUF1QixRQUF2QixDQUFmO0FBQ0EsT0FBS1MsS0FBTCxHQUFhVixTQUFTQyxhQUFULENBQXVCLFFBQXZCLENBQWI7QUFDQSxPQUFLVSxHQUFMLEdBQVdYLFNBQVNDLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBWDtBQUNBLE9BQUtWLElBQUwsR0FBWVMsU0FBU0MsYUFBVCxDQUF1QixPQUF2QixDQUFaO0FBQ0EsT0FBS08sV0FBTCxHQUFtQlIsU0FBU0MsYUFBVCxDQUF1QixjQUF2QixDQUFuQjtBQUNBLE9BQUtXLElBQUwsR0FBWVosU0FBU0MsYUFBVCxDQUF1QixPQUF2QixDQUFaO0FBQ0EsT0FBS1ksVUFBTCxHQUFrQmIsU0FBU0MsYUFBVCxDQUF1QixPQUF2QixDQUFsQjtBQUNBLE9BQUthLFlBQUwsR0FBb0JkLFNBQVNDLGFBQVQsQ0FBdUIsU0FBdkIsQ0FBcEI7QUFDQSxPQUFLRyxVQUFMO0FBQ0EsT0FBS1csU0FBTDtBQUNBLE9BQUtDLFdBQUw7QUFDQSxPQUFLQyxXQUFMO0FBQ0EsT0FBS0MsV0FBTDtBQUNBLE9BQUtDLFVBQUw7QUFDQSxPQUFLQyxVQUFMO0FBQ0EsRUFqQlM7QUFrQlZoQixhQUFZLFlBQVc7QUFDdEIsTUFBSXJCLE9BQU9JLFFBQVFNLE9BQVIsRUFBWDtBQUNBLE9BQUtZLE9BQUwsQ0FBYWdCLFNBQWIsR0FBeUIsRUFBekI7QUFDQTtBQUNBLE9BQUssTUFBTUMsQ0FBWCxJQUFnQnZDLElBQWhCLEVBQXFCO0FBQ3BCLE9BQUl3QyxTQUFTdkIsU0FBU3dCLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBYjtBQUNBRCxVQUFPRSxXQUFQLEdBQXFCMUMsS0FBS3VDLENBQUwsRUFBUSxDQUFSLENBQXJCO0FBQ0EsUUFBS2pCLE9BQUwsQ0FBYXFCLFdBQWIsQ0FBeUJILE1BQXpCO0FBQ0E7QUFDRCxFQTNCUztBQTRCVlIsWUFBVyxZQUFXO0FBQ3JCO0FBQ0EsT0FBS1YsT0FBTCxDQUFhc0IsZ0JBQWIsQ0FBOEIsUUFBOUIsRUFBd0MsVUFBU0MsQ0FBVCxFQUFXO0FBQ2xELE9BQUlDLFVBQVVELEVBQUVFLE1BQUYsQ0FBUzVCLEtBQXZCO0FBQ0E2QixXQUFRQyxHQUFSLENBQVlILE9BQVo7QUFDQTFDLFdBQVFPLGFBQVIsQ0FBc0JtQyxPQUF0QjtBQUNBRSxXQUFRQyxHQUFSLENBQVk3QyxRQUFRUyxhQUFSLEVBQVo7QUFDQVAsUUFBSzZCLFdBQUw7QUFDQTdCLFFBQUtzQixHQUFMLENBQVNzQixHQUFULEdBQWU5QyxRQUFRUyxhQUFSLEdBQXdCLENBQXhCLENBQWY7QUFDQVAsUUFBS0UsSUFBTCxDQUFVa0MsV0FBVixHQUF3QkksT0FBeEI7QUFDQXhDLFFBQUtxQixLQUFMLENBQVdlLFdBQVgsR0FBeUJ0QyxRQUFRRyxRQUFSLENBQWlCdUMsT0FBakIsRUFBMEIsQ0FBMUIsQ0FBekI7QUFDQSxHQVRELEVBU0csS0FUSDtBQVdBLEVBekNTO0FBMENWYixjQUFhLFlBQVc7QUFDdkI7QUFDQTNCLE9BQUtzQixHQUFMLENBQVNnQixnQkFBVCxDQUEwQixPQUExQixFQUFtQyxZQUFVO0FBQzVDO0FBQ0EsT0FBSU8sV0FBVy9DLFFBQVFTLGFBQVIsR0FBd0IsQ0FBeEIsQ0FBZjtBQUNBUCxRQUFLcUIsS0FBTCxDQUFXZSxXQUFYLEdBQXlCdEMsUUFBUUcsUUFBUixDQUFpQjRDLFFBQWpCLEVBQTJCLENBQTNCLENBQXpCO0FBQ0EsR0FKRCxFQUlHLEtBSkg7QUFLQSxFQWpEUztBQWtEVmpCLGNBQWEsWUFBVztBQUN2QixPQUFLVCxXQUFMLENBQWlCbUIsZ0JBQWpCLENBQWtDLE9BQWxDLEVBQTJDLFlBQVU7QUFDcER0QyxRQUFLdUIsSUFBTCxDQUFVdUIsU0FBVixDQUFvQkMsTUFBcEIsQ0FBMkIsUUFBM0I7QUFDQS9DLFFBQUs2QixXQUFMO0FBQ0EsR0FIRDtBQUlBLEVBdkRTO0FBd0RWQSxjQUFhLFlBQVU7QUFDdEJsQixXQUFTQyxhQUFULENBQXVCLHNCQUF2QixFQUErQ0MsS0FBL0MsR0FBdURmLFFBQVFTLGFBQVIsR0FBd0IsQ0FBeEIsQ0FBdkQ7QUFDQUksV0FBU0MsYUFBVCxDQUF1Qix3QkFBdkIsRUFBaURDLEtBQWpELEdBQXlEZixRQUFRUyxhQUFSLEdBQXdCLENBQXhCLENBQXpEO0FBQ0FJLFdBQVNDLGFBQVQsQ0FBdUIseUJBQXZCLEVBQWtEQyxLQUFsRCxHQUEwRGYsUUFBUVMsYUFBUixHQUF3QixDQUF4QixDQUExRDtBQUNBLEVBNURTO0FBNkRWdUIsYUFBWSxZQUFVO0FBQ3JCLE9BQUtOLFVBQUwsQ0FBZ0JjLGdCQUFoQixDQUFpQyxPQUFqQyxFQUEwQyxZQUFVO0FBQ25ELE9BQUlFLFVBQVUxQyxRQUFRUyxhQUFSLEdBQXdCLENBQXhCLENBQWQ7QUFDQVQsV0FBUVUsV0FBUixDQUFvQmdDLE9BQXBCO0FBQ0EsR0FIRDtBQUlBLEVBbEVTO0FBbUVWVCxhQUFZLFlBQVU7QUFDckIsT0FBS04sWUFBTCxDQUFrQmEsZ0JBQWxCLENBQW1DLE9BQW5DLEVBQTRDLFlBQVU7QUFDckR0QyxRQUFLdUIsSUFBTCxDQUFVdUIsU0FBVixDQUFvQkMsTUFBcEIsQ0FBMkIsUUFBM0I7QUFDQSxHQUZEO0FBR0E7QUF2RVMsQ0FBWDtBQXlFQWpELFFBQVFDLElBQVI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFsbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImxldCBtb2RlbCA9IHtcclxuXHRjdXJyZW50Q2F0OiBbJ0ZsdWZmeScsIDAsICdodHRwczovL3MyNi5wb3N0aW1nLmNjL3owenN1a3g2eC9GbHVmZnkuanBnJ10sXHJcblx0Y2F0czoge1xyXG5cdFx0Rmx1ZmZ5OiBbJ0ZsdWZmeScsIDAsICdodHRwczovL3MyNi5wb3N0aW1nLmNjL3owenN1a3g2eC9GbHVmZnkuanBnJ10sXHJcblx0XHRKdW1weTogWydKdW1weScsIDAsJ2h0dHBzOi8vczI2LnBvc3RpbWcuY2MvY3AyMDE2cWQ1L0p1bXB5LmpwZyddLFxyXG5cdFx0VG9tOiBbJ1RvbScsIDAsJ2h0dHBzOi8vczI2LnBvc3RpbWcuY2MvNXlsaXJyaW14L1RvbS5qcGcnXVxyXG5cdH1cclxufTtcclxuXHJcbmxldCBvY3RvcHVzID0ge1xyXG5cdGluaXQ6IGZ1bmN0aW9uKCl7XHJcblx0XHR2aWV3LmluaXQoKTtcclxuXHR9LFxyXG5cdC8vIEZpbmQgdGhlIGNvcnJlc3BvbmRpbmcgY2F0IGJ5IG5hbWUgYW5kIGNsaWNrIGl0IG4gdGltZXNcclxuXHRjYXRDb3VudDogZnVuY3Rpb24obmFtZSwgbikge1xyXG5cdFx0bW9kZWwuY2F0c1tuYW1lXVsxXSArPSBuO1xyXG5cdFx0cmV0dXJuIG1vZGVsLmNhdHNbbmFtZV1bMV07XHJcblx0fSxcclxuXHRnZXRDYXRzOiBmdW5jdGlvbigpe1xyXG5cdFx0cmV0dXJuIG1vZGVsLmNhdHM7XHJcblx0fSxcclxuXHRzZXRDdXJyZW50Q2F0OiBmdW5jdGlvbihjYXQpe1xyXG5cdFx0bW9kZWwuY3VycmVudENhdCA9IG9jdG9wdXMuZ2V0Q2F0cygpW2NhdF07XHJcblx0fSxcclxuXHRnZXRDdXJyZW50Q2F0OiBmdW5jdGlvbigpe1xyXG5cdFx0cmV0dXJuIG1vZGVsLmN1cnJlbnRDYXQ7XHJcblx0fSxcclxuXHRzYXZlQ29udGVudDogZnVuY3Rpb24oY2F0KXtcclxuXHRcdGxldCBjYXRJbmZvID0gbW9kZWwuY3VycmVudENhdDtcclxuXHRcdGxldCBuZXdDYXROYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXRbbmFtZT1cXCdOYW1lXFwnXScpLnZhbHVlO1xyXG5cdFx0Y2F0SW5mb1swXSA9IG5ld0NhdE5hbWU7XHJcblx0XHRjYXRJbmZvWzJdID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXRbbmFtZT1cXCdJbWdVUkxcXCddJykudmFsdWU7XHJcblx0XHRjYXRJbmZvWzFdID0gTnVtYmVyKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W25hbWU9XFwnI0NsaWNrc1xcJ10nKS52YWx1ZSk7XHJcblx0XHRkZWxldGUgbW9kZWwuY2F0c1tjYXRdO1xyXG5cdFx0bW9kZWwuY2F0c1tuZXdDYXROYW1lXSA9IGNhdEluZm87XHJcblx0XHR2aWV3LnJlbmRlckxpc3QoKTtcclxuXHRcdHZpZXcuY2F0TGlzdC52YWx1ZSA9IG5ld0NhdE5hbWU7XHJcblx0XHR2aWV3LmNhdExpc3QuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ2NoYW5nZScpKTtcclxuXHRcdHZpZXcuYWRtaW5CdXR0b24uY2xpY2soKTtcclxuXHR9XHJcbn07XHJcblxyXG5sZXQgdmlldyA9IHtcclxuXHRpbml0OiBmdW5jdGlvbigpe1xyXG5cdFx0dGhpcy5jYXRMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcignc2VsZWN0Jyk7XHJcblx0XHR0aGlzLmNvdW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvdW50Jyk7XHJcblx0XHR0aGlzLmltZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2ltZycpO1xyXG5cdFx0dGhpcy5uYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5hbWUnKTtcdFxyXG5cdFx0dGhpcy5hZG1pbkJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbi5hZG1pbicpO1xyXG5cdFx0dGhpcy5mb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvcm0nKTtcclxuXHRcdHRoaXMuc2F2ZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zYXZlJyk7XHJcblx0XHR0aGlzLmNhbmNlbEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYW5jZWwnKTtcclxuXHRcdHRoaXMucmVuZGVyTGlzdCgpO1xyXG5cdFx0dGhpcy5yZW5kZXJJbWcoKTtcdFxyXG5cdFx0dGhpcy5yZW5kZXJDb3VudCgpO1xyXG5cdFx0dGhpcy50b2dnbGVBZG1pbigpO1xyXG5cdFx0dGhpcy5mb3JtQ29udGVudCgpO1xyXG5cdFx0dGhpcy5zdWJtaXRGb3JtKCk7XHJcblx0XHR0aGlzLmNhbmNlbEZvcm0oKTtcclxuXHR9LFxyXG5cdHJlbmRlckxpc3Q6IGZ1bmN0aW9uKCkge1xyXG5cdFx0bGV0IGNhdHMgPSBvY3RvcHVzLmdldENhdHMoKTtcclxuXHRcdHRoaXMuY2F0TGlzdC5pbm5lckhUTUwgPSAnJztcclxuXHRcdC8vIEJ1aWxkIHNlbGVjdGlvbiBvZiBjYXRzIGluIHRoZSBkcm9wZG93biBtZW51XHJcblx0XHRmb3IgKGNvbnN0IGkgaW4gY2F0cyl7XHJcblx0XHRcdGxldCBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcclxuXHRcdFx0b3B0aW9uLnRleHRDb250ZW50ID0gY2F0c1tpXVswXTtcclxuXHRcdFx0dGhpcy5jYXRMaXN0LmFwcGVuZENoaWxkKG9wdGlvbik7XHJcblx0XHR9XHJcblx0fSxcclxuXHRyZW5kZXJJbWc6IGZ1bmN0aW9uKCkge1xyXG5cdFx0Ly8gQ2hhbmdlIGNhdCBpbWFnZSBhY2NvcmRpbmcgdG8geW91ciBzZWxlY3Rpb25cclxuXHRcdHRoaXMuY2F0TGlzdC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBmdW5jdGlvbihlKXtcclxuXHRcdFx0bGV0IGNhdE5hbWUgPSBlLnRhcmdldC52YWx1ZTtcclxuXHRcdFx0Y29uc29sZS5sb2coY2F0TmFtZSk7XHJcblx0XHRcdG9jdG9wdXMuc2V0Q3VycmVudENhdChjYXROYW1lKTtcdFxyXG5cdFx0XHRjb25zb2xlLmxvZyhvY3RvcHVzLmdldEN1cnJlbnRDYXQoKSlcclxuXHRcdFx0dmlldy5mb3JtQ29udGVudCgpO1x0XHJcblx0XHRcdHZpZXcuaW1nLnNyYyA9IG9jdG9wdXMuZ2V0Q3VycmVudENhdCgpWzJdO1xyXG5cdFx0XHR2aWV3Lm5hbWUudGV4dENvbnRlbnQgPSBjYXROYW1lO1xyXG5cdFx0XHR2aWV3LmNvdW50LnRleHRDb250ZW50ID0gb2N0b3B1cy5jYXRDb3VudChjYXROYW1lLCAwKTtcclxuXHRcdH0sIGZhbHNlKTtcclxuXHJcblx0fSxcclxuXHRyZW5kZXJDb3VudDogZnVuY3Rpb24oKSB7XHJcblx0XHQvLyBDb3VudCB0aGUgbnVtYmVyIG9mIGNsaWNrcyB1bmlxdWUgdG8gZWFjaCBjYXRcclxuXHRcdHZpZXcuaW1nLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuXHRcdFx0Ly9nZXQgdGhlIG5hbWUgb2YgaW1nXHJcblx0XHRcdGxldCBzZWxlY3RlZCA9IG9jdG9wdXMuZ2V0Q3VycmVudENhdCgpWzBdO1xyXG5cdFx0XHR2aWV3LmNvdW50LnRleHRDb250ZW50ID0gb2N0b3B1cy5jYXRDb3VudChzZWxlY3RlZCwgMSk7XHJcblx0XHR9LCBmYWxzZSk7XHRcclxuXHR9LFxyXG5cdHRvZ2dsZUFkbWluOiBmdW5jdGlvbigpIHtcclxuXHRcdHRoaXMuYWRtaW5CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpe1xyXG5cdFx0XHR2aWV3LmZvcm0uY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZGVuJyk7XHJcblx0XHRcdHZpZXcuZm9ybUNvbnRlbnQoKTtcclxuXHRcdH0pO1xyXG5cdH0sXHJcblx0Zm9ybUNvbnRlbnQ6IGZ1bmN0aW9uKCl7XHJcblx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dFtuYW1lPVxcJ05hbWVcXCddJykudmFsdWUgPSBvY3RvcHVzLmdldEN1cnJlbnRDYXQoKVswXTtcclxuXHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W25hbWU9XFwnSW1nVVJMXFwnXScpLnZhbHVlID0gb2N0b3B1cy5nZXRDdXJyZW50Q2F0KClbMl07XHJcblx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dFtuYW1lPVxcJyNDbGlja3NcXCddJykudmFsdWUgPSBvY3RvcHVzLmdldEN1cnJlbnRDYXQoKVsxXTtcclxuXHR9LFxyXG5cdHN1Ym1pdEZvcm06IGZ1bmN0aW9uKCl7XHJcblx0XHR0aGlzLnNhdmVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpe1xyXG5cdFx0XHRsZXQgY2F0TmFtZSA9IG9jdG9wdXMuZ2V0Q3VycmVudENhdCgpWzBdO1xyXG5cdFx0XHRvY3RvcHVzLnNhdmVDb250ZW50KGNhdE5hbWUpO1xyXG5cdFx0fSk7XHJcblx0fSxcclxuXHRjYW5jZWxGb3JtOiBmdW5jdGlvbigpe1xyXG5cdFx0dGhpcy5jYW5jZWxCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpe1xyXG5cdFx0XHR2aWV3LmZvcm0uY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZGVuJyk7XHJcblx0XHR9KTtcclxuXHR9XHJcbn07XHJcbm9jdG9wdXMuaW5pdCgpO1xyXG4vLyBsZXQgbmFtZXMgPSBbJ0ZsdWZmeScsICdKdW1weScsICdUb20nXTtcclxuLy8gbGV0IGNvdW50cyA9IFswLCAwLCAwXTtcclxuLy8gbGV0IGltZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2ltZycpO1xyXG4vLyBsZXQgbmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYW1lJyk7XHJcblxyXG4vLyAvLyBGaW5kIHRoZSBjb3JyZXNwb25kaW5nIGNhdCBieSBuYW1lIGFuZCBjbGljayBpdCBuIHRpbWVzXHJcbi8vIGZ1bmN0aW9uIGNhdENvdW50KG5hbWUsIG4pIHtcclxuLy8gXHRsZXQgaW5kZXggPSBuYW1lcy5pbmRleE9mKG5hbWUpO1xyXG4vLyBcdGNvdW50c1tpbmRleF0gKz0gbjtcclxuLy8gXHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY291bnQnKS50ZXh0Q29udGVudCA9IGNvdW50c1tpbmRleF07XHJcbi8vIH1cclxuXHJcbi8vIC8vIEJ1aWxkIHNlbGVjdGlvbiBvZiBjYXRzIGluIHRoZSBkcm9wZG93biBtZW51XHJcbi8vIGZvciAobGV0IGk9MDsgaTxuYW1lcy5sZW5ndGg7IGkrKyl7XHJcbi8vIFx0bGV0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xyXG4vLyBcdG9wdGlvbi50ZXh0Q29udGVudCA9IG5hbWVzW2ldO1xyXG4vLyBcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3NlbGVjdCcpLmFwcGVuZENoaWxkKG9wdGlvbik7XHJcbi8vIH1cclxuXHJcbi8vIC8vIENoYW5nZSBjYXQgaW1hZ2UgYWNjb3JkaW5nIHRvIHlvdXIgc2VsZWN0aW9uXHJcbi8vIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3NlbGVjdCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGZ1bmN0aW9uKGUpe1xyXG4vLyBcdGxldCBjYXROYW1lID0gZS50YXJnZXQudmFsdWU7XHJcbi8vIFx0bGV0IHNyYyA9ICdpbWcvJytjYXROYW1lKycuanBnJztcdFxyXG4vLyBcdGltZy5zcmMgPSBzcmM7XHJcbi8vIFx0bmFtZS50ZXh0Q29udGVudCA9IGNhdE5hbWU7XHJcbi8vIFx0Y2F0Q291bnQoY2F0TmFtZSwgMCk7XHJcbi8vIH1cclxuLy8gXHQsIGZhbHNlKTtcclxuXHJcbi8vIC8vIENvdW50IHRoZSBudW1iZXIgb2YgY2xpY2tzIHVuaXF1ZSB0byBlYWNoIGNhdFxyXG4vLyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpbWcnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xyXG4vLyBcdGxldCBzZWxlY3RlZCA9IGUudGFyZ2V0LnNyYy5zcGxpdCgnLycpLnBvcCgpLnNwbGl0KCcuJylbMF07XHJcbi8vIFx0Y2F0Q291bnQoc2VsZWN0ZWQsIDEpO1xyXG4vLyB9LCBmYWxzZSk7Il19

import Ember from 'ember';

const {
	Controller,
	computed
} = Ember;

const {
	alias
} = computed;

export default Controller.extend({

	bikers: alias('model'),

	currBiker: null,

	name: '',
	email: '',

	id: '',

	cannotCreate: computed('fullname', 'email', function () {
		return !this.get('fullname') || !this.get('email');
	}),

	actions: {

		createBiker() {
			const {
				name,
				email
			} = this.getProperties('fullname', 'email');
			this.store.createRecord('biker', {
				name,
				email
			}).save();
		},

		readBiker() {
			const id = this.get('id');
			this.store.findRecord('biker', id).then(
				(biker) => {
					this.set('currBiker', biker);
				}
			);
		},

		updateBiker() {
			const {
				id,
				name,
				email
			} = this.getProperties('id', 'fullname', 'email');
			this.store.findRecord('biker', id).then(function (biker) {
				biker.setProperties({
					name,
					email
				});

				biker.save(); // => PUT to '/bikers/{id}'
			});
		},

		deleteBiker() {
			const id = this.get('id');
			this.store.findRecord('biker', id).then(function (biker) {
				biker.destroyRecord(); // => DELETE to /bikers/{id}
			});
		}
	}
});
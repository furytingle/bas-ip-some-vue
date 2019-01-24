<template>
    <div class="container">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <router-link :to="{name: 'user.index'}">Users</router-link>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                    Create
                </li>
            </ol>
        </nav>
        <h4>Create a user</h4>

        <div v-if="loaded" class="container" style="width: 500px;">
            <form autocomplete="off" v-on:submit="create">
                <div class="form-group">
                    <label for="name">Full name</label>
                    <input type="text" id="name" class="form-control" v-model="name" required>
                </div>

                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" class="form-control" v-model="email" required>
                </div>

                <div class="form-group row">
                    <label for="department" class="col-sm-3 col-form-label">Department</label>
                    <div class="col-sm-9">
                        <select id="department" class="form-control" v-model="departmentId" required
                                v-on:change="populatePositions">
                            <option disabled value="">Select department</option>
                            <option v-for="(department, index) in departments" v-bind:key="department.id"
                                    v-bind:value="index">
                                {{department.name}}
                            </option>
                        </select>
                    </div>
                </div>

                <div v-if="positions.length > 0">
                    <div  class="form-group row">
                        <label for="position" class="col-sm-3 col-form-label">Position</label>
                        <div class="col-sm-9">
                            <select id="position" class="form-control" v-model="positionIndex" required>
                                <option disabled value="">Select position</option>
                                <option v-for="(position, index) in positions" v-bind:key="position.id" v-bind:value="index" :disabled="position.disabled">
                                    {{position.name}}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="salary" class="col-sm-3 col-form-label">Salary</label>
                        <div class="col-sm-5">
                            <input type="text" id="salary" class="form-control" v-model="salary" required>
                        </div>
                        <div class="col-sm-4">
                            <button type="button" class="btn btn-primary" :disabled="addPositionButtonDisabled()" v-on:click="addPosition">Add position</button>
                        </div>
                    </div>
                </div>

                <div v-if="userPositions.length > 0">
                    <table class="table">
                        <tbody>
                        <tr v-for="(position, index) in userPositions" v-bind:key="index">
                            <td>{{position.name}}</td>
                            <td>{{position.salary}}</td>
                            <td>
                                <button type="button" class="btn btn-sm btn-secondary" v-on:click="removePosition(index)">Remove</button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                <input type="submit" class="btn btn-success" value="Create">
            </form>
        </div>
        <div v-else class="container" style="width: 300px">
            <h5>Loading...</h5>
        </div>
    </div>
</template>

<script>
import http from '@/http/index';

export default {
    name: 'UserCreate',
    data() {
        return {
            loaded: false,
            departments: [],
            positions: [],
            //form models
            name: '',
            email: '',
            positionIndex: '',
            userPositions: [],
            departmentId: '',
            salary: '',
            //errors
            errors: {
                name: '',
                email: '',
                positionId: '',
                salary: ''
            }
        };
    },
    created() {
        http.get('departments')
            .then(response => {
                this.departments = response.data.result;
                this.loaded = true;
            })
            .catch(error => {
                console.log(error.response.data.message);
            });
    },
    methods: {
        create(e) {
            e.preventDefault();

            let positions = this.userPositions.map(position => {
                return {
                    id: position.id,
                    salary: position.salary
                };
            });

            let user = {
                name: this.name,
                email: this.email,
                positions: positions
            };
            http.post('users', user)
                .then(() => {
                    this.$router.push({ name: 'user.index' });
                })
                .catch(error => {
                    this.errors = error.request.data.errors;
                });
        },
        populatePositions(e) {
            this.positions = this.departments[e.target.value].positions;
        },
        addPosition() {
            let position = this.positions[this.positionIndex];
            position.salary = this.salary;
            this.userPositions.push(position);
            this.positions[this.positionIndex].disabled = true;
        },
        addPositionButtonDisabled() {
            let position = this.positions[this.positionIndex];
            return this.salary === '' || position.disabled;
        },
        removePosition(index) {
            this.positions[index].disabled = false;
            this.userPositions.splice(index, 1);
        }
    }
};
</script>

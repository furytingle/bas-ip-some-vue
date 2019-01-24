<template>
    <div class="container">
        <h4>Here will be some users</h4>
        <router-link :to="{name: 'user.create'}" class="btn btn-light">Create</router-link>

        <div v-if="loaded" style="margin-top: 50px">
            <table class="table">
                <thead>
                <tr>
                    <th scope="col">
                        <a href="#" v-on:click="sortByKey('name')">Full name</a>
                    </th>
                    <th scope="col">
                        <a href="#" v-on:click="sortByKey('email')">Email</a>
                    </th>
                    <th scope="col">
                        <a href="#" v-on:click="sortByPositionsNumber">Positions & Departments</a>
                    </th>
                    <th scope="col">
                        <a href="#" v-on:click="sortBySalary">Salary</a>
                    </th>
                    <th>#</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="user in users" v-bind:key="user.id">
                    <td>{{user.name}}</td>
                    <td>{{user.email}}</td>
                    <td>
                        <p v-for="(position, index) in user.positions" v-bind:key="index">
                            {{position.name}} | {{getDepartmentName(position.department_id)}}
                        </p>
                    </td>
                    <td>
                        {{getSalary(user.positions)}}
                    </td>
                    <td>
                        <router-link :to="{name: 'user.edit', params: {id: user.id}}" class="btn btn-sm btn-light">
                            Edit
                        </router-link>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <div v-else class="container" style="width: 300px">
            <h5>Loading...</h5>
        </div>
    </div>
</template>

<script>
import http from '@/http/index';

export default {
    name: 'UserIndex',
    data() {
        return {
            loaded: false,
            users: [],
            departments: [],
            errors: [],
            reverse: false
        };
    },
    created() {
        http.get('users').then(
            response => {
                this.users = response.data.result;
                http.get('departments').then(response => {
                    this.departments = response.data.result;
                    this.loaded = true;
                });
            },
            error => {
                this.errors = error.response.data.errors;
            }
        );
    },
    methods: {
        getDepartmentName(departmentId) {
            for (let i in this.departments) {
                if (this.departments[i].id === departmentId) {
                    return this.departments[i].name;
                }
            }
        },
        getSalary(positions) {
            let salary = 0;
            for (let i in positions) {
                salary += positions[i].details.salary;
            }
            return salary;
        },
        sortByKey(key) {
            this.users.sort((a, b) => {
                let modifier = 1;
                if (this.reverse) {
                    modifier = -1;
                }
                if (a[key] < b[key]) {
                    return -1 * modifier;
                }
                if (a[key] > b[key]) {
                    return modifier;
                }
                return 0;
            });
            this.reverse = !this.reverse;
        },
        sortBySalary() {
            this.users.sort((a, b) => {
                let modifier = 1;
                if (this.reverse) {
                    modifier = -1;
                }
                if (this.getSalary(a.positions) < this.getSalary(b.positions)) {
                    return -1 * modifier;
                }
                if (this.getSalary(a.positions) > this.getSalary(b.positions)) {
                    return modifier;
                }
                return 0;
            });
            this.reverse = !this.reverse;
        },
        sortByPositionsNumber() {
            this.users.sort((a, b) => {
                let modifier = 1;
                if (this.reverse) {
                    modifier = -1;
                }
                if (a.positions.length < b.positions.length) {
                    return -1 * modifier;
                }
                if (a.positions.length > b.positions.length) {
                    return modifier;
                }
                if (a.positions.length === b.positions.length) {
                    if (a.positions[0].name < b.positions[0].name) {
                        return -1;
                    }
                    if (a.positions[0].name > b.positions[0].name) {
                        return 1;
                    }
                    return 0;
                }
            });
            this.reverse = !this.reverse;
        }
    }
};
</script>

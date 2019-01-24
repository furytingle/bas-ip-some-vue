<template>
    <div class="container">
        <table v-if="loaded" class="table">
            <thead>
            <tr>
                <th>Department</th>
                <th>Name</th>
                <th>Salary</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="record in salaryReport" v-bind:key="record.id">
                <td>{{record.department}}</td>
                <td>{{record.user}}</td>
                <td>{{record.salary}}</td>
            </tr>
            </tbody>
        </table>
        <h5 v-else>Loading...</h5>
    </div>
</template>

<script>
import http from '@/http/index';

export default {
    name: 'SalaryReport',
    data() {
        return {
            loaded: false,
            salaryReport: []
        };
    },
    created() {
        this.getReports();
    },
    mounted() {
        setInterval(() => {
            this.getReports();
        }, 10000);
    },
    methods: {
        getReports() {
            http.get('departments/report')
                .then(response => {
                    this.salaryReport = response.data.result;
                    this.loaded = true;
                })
                .catch(error => {
                    console.log(error.response.data.errors);
                });
        }
    }
};
</script>

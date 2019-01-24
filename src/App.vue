<template>
    <div id="app">
        <div id="nav">
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <a class="navbar-brand" href="#">Bas-ip test task</a>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item active">
                            <router-link to="/" class="nav-link">Home</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/about" class="nav-link">About</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="{name: 'user.index'}" class="nav-link">Users</router-link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
        <div class="row">
            <div class="col-md-10">
                <router-view/>
            </div>
            <div class="col-md-2">
                <salary-report></salary-report>
            </div>
        </div>
    </div>
</template>

<script>
import SalaryReport from './components/SalaryReport';

export default {
    components: { SalaryReport }
};
</script>

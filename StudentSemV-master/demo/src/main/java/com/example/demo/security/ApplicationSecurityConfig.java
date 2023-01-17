package com.example.demo.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;

import static com.example.demo.security.ApplicationUserRole.*;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class ApplicationSecurityConfig extends WebSecurityConfigurerAdapter {

    private final PasswordEncoder passwordEncoder;

    @Autowired
    public ApplicationSecurityConfig(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .cors().and()
                .csrf().disable()
//                .csrf().csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse()).and()
                .authorizeRequests()
                .antMatchers("/", "index","/css/*", "/js/*").permitAll()
                .antMatchers("/api/**").hasRole(STUDENT.name())
//                .antMatchers(HttpMethod.DELETE, "/management/api/**").hasAuthority(ApplicationUserPermission.COURSES_WRITE.getPermission())
//                .antMatchers(HttpMethod.PUT, "/management/api/**").hasAuthority(ApplicationUserPermission.COURSES_WRITE.getPermission())
//                .antMatchers(HttpMethod.POST, "/management/api/**").hasAuthority(ApplicationUserPermission.COURSES_WRITE.getPermission())
//                .antMatchers(HttpMethod.GET, "/management/api/**").hasAnyRole(ADMIN.name(), ADMINTRAINEE.name())
                .anyRequest()
                .authenticated()
                .and()
                .httpBasic();
//                .formLogin()
//                .loginPage("/login").permitAll()
//                .defaultSuccessUrl("/courses", true)
//                    .passwordParameter("passwordxyz")
//                    .usernameParameter("usernamexyz")
//                .and()
//                .rememberMe()
//                    .tokenValiditySeconds((int)TimeUnit.DAYS.toSeconds(21))
//                    .key("uniqueAndSecret")
//                    .rememberMeParameter("remember-mexyz")
//                .and()
//                .logout()
//                .logoutUrl("/logout")
//                    .clearAuthentication(true)
//                    .invalidateHttpSession(true)
//                    .deleteCookies("remember-me", "JSESSIONID")
//                    .logoutSuccessUrl("/login");
    }

    @Override
    @Bean
    protected UserDetailsService userDetailsService() {

        UserDetails adminUser = User.builder()
                .username("marcin")
                .password(passwordEncoder.encode("admin"))
//                .roles(ADMIN.name())
                .authorities(ADMIN.getGrantedAuthorities())
                .build();

        UserDetails studentUser = User.builder()
                .username("jan")
                .password(passwordEncoder.encode("student"))
//                .roles(STUDENT.name())
                .authorities(STUDENT.getGrantedAuthorities())
                .build();

        UserDetails adminTraineeUser = User.builder()
                .username("pawel")
                .password(passwordEncoder.encode("admin"))
//                .roles(ADMINTRAINEE.name())
                .authorities(ADMINTRAINEE.getGrantedAuthorities())
                .build();


        return new InMemoryUserDetailsManager(
                adminUser, studentUser, adminTraineeUser
        );
    }
}

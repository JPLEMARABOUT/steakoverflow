#!/usr/bin/perl
use strict;
use warnings FATAL => 'all';
use LWP::UserAgent;
use HTTP::Request;

act("http://localhost:8081/delete_unconfirmed_user");
my $hour = 60*60;

sub act{
    my $ua      = LWP::UserAgent->new();
    my $request = HTTP::Request->new("POST", $_[0]);
    my $content = $ua->request($request)->as_string();
    print $content;
    sleep($hour*24);
    act($_[0]);
}
